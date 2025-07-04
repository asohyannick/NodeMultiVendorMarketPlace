import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import StripePayment from '../../../../model/payment/payment.model';
const showStripePayments = async(_req: Request, res: Response): Promise<Response> => {
    try {
        const payments = await StripePayment.find();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Stripe payments have been fetched esuccessfully!",
            payments
        });
    } catch (error) {
        console.error("Error occurred while processing payment with Stripe:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
};

export {
    showStripePayments
};