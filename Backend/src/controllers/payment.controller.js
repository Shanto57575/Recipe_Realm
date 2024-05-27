import asyncHandler from "express-async-handler"
import Stripe from 'stripe';
import User from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const givePayment = asyncHandler(async (req, res) => {
    const { money } = req.body

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "coin"
                    },
                    unit_amount: money * 100
                },
                quantity: money * 100
            }
        ],
        mode: "payment",
        success_url: "http://localhost:5173/payment-success",
        cancel_url: "http://localhost:5173/payment-failure"
    })

    res.status(200).json({ id: session.id })
})

export {
    givePayment
}