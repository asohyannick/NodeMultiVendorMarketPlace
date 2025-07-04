import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import StripePayment from '../../../../model/payment/payment.model';
const editAndUpdateStripePayment = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const {
            amount,
            currency 
        } = req.body;
        const payment = await StripePayment.findByIdAndUpdate(id, {
            amount,
            currency
        }, { new: true, runValidators: true });
        if (!payment) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Payment doesn't exist!" });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Stripe payment has been updated esuccessfully",
            payment
        });
    } catch (error) {
        console.error("Error occurred while processing payment with Stripe:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
};

export {
    editAndUpdateStripePayment
};