import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import StripePayment from '../../../../model/payment/payment.model';
import Stripe from 'stripe';
import mongoose from 'mongoose';
import { PaymentStatus } from '../../../interfac/payment/payment.interfac';
const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY as string, {
    apiVersion:'2025-05-28.basil',
});
const processStripePayment = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { amount, currency } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card'],
        });
        // saving payments to our mongoDB collection
        const payment = new StripePayment({
            paymentIntentId: paymentIntent.id,
            amount,
            currency,
            status:PaymentStatus.SUCCESS,
            lastUpdated: Date.now(),
        });
        await payment.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            status: PaymentStatus.SUCCESS,
            message: "Stripe payment successful",
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Error occurred while processing payment with Stripe:", error);

        // Check if error is an instance of Stripe's APIError
        if (error instanceof Stripe.errors.StripeError) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        }

         // Handle MongoDB errors
        if (error instanceof mongoose.Error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error saving payment to database." });
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
};

export {
    processStripePayment
};