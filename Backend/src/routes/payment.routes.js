import express from 'express';
import { givePayment } from '../controllers/payment.controller.js';

const paymentRouter = express.Router()

paymentRouter.route('/checkout').post(givePayment)

export default paymentRouter