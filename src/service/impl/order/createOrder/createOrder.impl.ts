import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Order from "../../../../model/order/order.model";
import { OrderStatus } from "../../../interfac/order/order.interfac";
const createOrder = async (req: Request, res: Response): Promise<Response> => {
    const {
        shippingAddress,
        payment,
        totalAmount
    } = req.body;
    try {
        const newOrder = new Order({
            shippingAddress,
            payment,
            status: OrderStatus.DELIVERED,
            totalAmount
        });
        await newOrder.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "A new order has been cred successfully!",
            newOrder
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default createOrder;