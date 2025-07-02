import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Order from "../../../../model/order/order.model";
const showOrder = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Order doesn't exist!"});
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Order has been fetched successfully!",
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

export default showOrder;