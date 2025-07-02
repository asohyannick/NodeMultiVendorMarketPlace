import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Order from "../../../../model/order/order.model";
import { OrderStatus } from "../../../interfac/order/order.interfac";
const updateOrder = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const {
            shippingAddress,
            payment,
            totalAmount
        } = req.body;
        const order = await Order.findByIdAndUpdate(id, {
            shippingAddress,
            payment,
            status: OrderStatus.DELIVERED,
            totalAmount
        }, { new: true });
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Order doesn't exist!" });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Order has been updated successfully!",
            order
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default updateOrder;