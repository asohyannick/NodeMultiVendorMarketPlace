import Cart from "../../../../model/cart/cart.model";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
const showCartItem = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const cartItem = await Cart.findById(id);
        if (!cartItem) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Cart Item doesn't exist!"});
        }
        return res.status(StatusCodes.OK).json({ 
            success: true,
            message: "User can now fetch and view a single available cart item in his her shopping cart successfully", 
            cartItem,
        });
    } catch (error) {
        console.error('Error occured!', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        })
    }

}

export default showCartItem;