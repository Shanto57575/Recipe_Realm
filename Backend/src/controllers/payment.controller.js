import asyncHandler from "express-async-handler"
import Stripe from 'stripe';
import User from "../models/user.model.js";


const givePayment = asyncHandler(async (req, res) => {
    try {
        const { money, imgURL } = req.body
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "EUR",
                        product_data: {
                            name: `Coins`,
                            images: [imgURL],
                            description: `You will Get ${money * 100} Coins After Successfull Payment`
                        },
                        unit_amount: money * 100
                    },
                    quantity: 1
                }
            ],
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/payment-failure`,
            customer_email: "shanto57575@gmail.com",
        })
        res.status(200).json({ id: session.id })
    } catch (error) {
        throw new Error(error.message)
    }
})

const handlePaymentSuccess = asyncHandler(async (req, res) => {
    try {
        const { userId, token, coins } = req.body
        if (token) {
            const user = await User.findById(userId)
            if (!user) {
                return res.status(404).json({ message: "User Not Found" })
            }
            user.coin += coins
            await user.save()
            res.status(200).json({ message: "You Got Coins", user })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

export {
    givePayment,
    handlePaymentSuccess
}