import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js"

import { Database } from "@/types_db";
import { Price, Product } from "@/types"

import { stripe } from "./stripe"
import { toDataTime } from "./helpers";

export const supabaseAdmin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
)

const upsertProductRecord = async (product: Stripe.Product) => {
    const productData: Product = {
        id: product.id,
        active: product.active,
        name: product.name,
        description: product.description ?? undefined,
        image: product.images?.[0] ?? null,
        metadata: product.metadata
    }

    const { error } = await supabaseAdmin
        .from("products")
        .upsert([productData])

    if(error) throw error

    console.log(`Product inserted/updated: ${product.id}`)
}

const upsertPriceRecord = async (price: Stripe.Price) => {
    const priceData: Price = {
        id: price.id,
        product_id: typeof price.product === "string" ? price.product : "",
        active: price.active,
        currency: price.currency,
        description: price.nickname ?? undefined,
        type: price.type,
        unit_amount: price.unit_amount ?? undefined,
        interval: price.recurring?.interval,
        interval_count: price.recurring?.interval_count,
        trial_period_days: price.recurring?.trial_period_days,
        metadata: price.metadata
    }

    const { error } = await supabaseAdmin
        .from("prices")
        .upsert([priceData])

    if( error ) throw error

    console.log(`Price inserted/updated: ${price.id}`)
}

const createOrRetrieveACustomer = async ({
    email,
    uuid,
}: {
    email: string,
    uuid: string
}) => {
    const { data, error } = await supabaseAdmin
        .from("customers")
        .select("stripe_customer_id")
        .eq("id", uuid)
        .single()

    if(error || !data?.stripe_customer_id) {
        const customerData: {
            metadata: {
                supabaseUUID: string
            },
            email?: string
        } = {
            metadata: {
                supabaseUUID: uuid
            }
        }

        if(email) {
            customerData.email = email
        }

        const customer = await stripe.customers.create(customerData)

        const { error } = await supabaseAdmin
            .from("customers")
            .insert([{ id: uuid, stripe_customer_id: customer.id }])

        if(error) throw error

        console.log(`New customer created and inserted for ${uuid}`)
    }

    return data?.stripe_customer_id
}

const copyBillingDetailsToCustomer = async (
    uuid: string,
    payment_method: Stripe.PaymentMethod
) => {
    const customer = payment_method.customer as string
    const { name, phone, address } = payment_method.billing_details

    if(!name || !phone || !address) return

    // @ts-ignore
    await stripe.customers.update(customer, { name, phone, address })

    const { error } = await supabaseAdmin
        .from("users")
        .update({
            billing_address: { ...address },
            payment_method: { ...payment_method[payment_method.type] }
        })
        .eq("id", uuid)

    if(error) throw error
}

const manageSubcriptionStatusChange = async (
    subscriptionId: string,
    customerId: string,
    createAction = false
) => {
    const { data: customerData, error: customerError } = await supabaseAdmin
        .from("customers")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .single()
    
    if(customerError) throw customerData

    const { id: uuid } = customerData!

    const subcription = await stripe.subscriptions.retrieve(
        subscriptionId,
        {
            expand: ["default_payment_method"]
        }
    )

    const subcriptionData: Database["public"]["Tables"]["subscriptions"]["Insert"] = {
        id: subcription.id,
        user_id: uuid,
        metadata: subcription.metadata,
        // @ts-ignore
        status: subcription.status,
        price_id: subcription.items.data[0].price.id,
        // @ts-ignore
        quantity: subcription.quantity,
        cancel_at_period_end: subcription.cancel_at_period_end,
        cancel_at: subcription.cancel_at ? toDataTime(subcription.cancel_at).toISOString() : null,
        canceled_at: subcription.canceled_at ? toDataTime(subcription.canceled_at).toISOString() : null,
        current_period_start: toDataTime(subcription.current_period_start).toISOString(),
        current_period_end: toDataTime(subcription.current_period_end).toISOString(),
        created: toDataTime(subcription.created).toISOString(),
        ended_at: subcription.ended_at ? toDataTime(subcription.ended_at).toISOString() : null,
        trial_start: subcription.trial_start ? toDataTime(subcription.trial_start).toISOString() : null,
        trial_end: subcription.trial_end ? toDataTime(subcription.trial_end).toISOString() : null,
    }

    const { error } = await supabaseAdmin
        .from("subscriptions")
        .upsert([subcriptionData])

    if(error) throw error

    console.log(`Inserted/updated subcription [${subcription.id} for ${uuid}]`)

    if(createAction && subcription.default_payment_method && uuid) {
        await copyBillingDetailsToCustomer(
            uuid,
            subcription.default_payment_method as Stripe.PaymentMethod,
        )
    }
}

export {
    upsertProductRecord,
    upsertPriceRecord,
    createOrRetrieveACustomer,
    manageSubcriptionStatusChange,
}


   