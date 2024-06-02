import express from 'express';
import { givePayment, handlePaymentSuccess } from '../controllers/payment.controller.js';

const paymentRouter = express.Router()

paymentRouter.route('/checkout').post(givePayment)
paymentRouter.route('/payment-success').post(handlePaymentSuccess)

export default paymentRouter