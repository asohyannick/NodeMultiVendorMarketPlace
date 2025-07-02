import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Order from "../../../../model/order/order.model";
const showOrders = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const orders = await Order.find();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Orders have been fetched successfully!",
            orders
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default showOrders;