import Cart from "../../../../model/cart/cart.model";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
const showCartItems = async(_req: Request, res: Response): Promise<Response> => {
    try {
        const cartItems = await Cart.find();
        return res.status(StatusCodes.OK).json({ 
            success: true,
            message: "User can now fetch and view all available cart items in his her shopping cart successfully", 
            cartItems,
        });
    } catch (error) {
        console.error('Error occured!', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        })
    }

}

export default showCartItems;