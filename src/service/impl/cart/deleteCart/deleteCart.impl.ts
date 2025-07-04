import Cart from "../../../../model/cart/cart.model";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
const deleteCart = async (req: Request, res: Response): Promise<Response> => {
    const { id, productId } = req.params;
    try {
        // check if the cart exist
        const cart = await Cart.findById(id);
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Cart doesn't exist!" });
        }
        // check if the product exist in the cart
        const existingProduct = cart.items.find(p => p.productId.toString() !== productId);
        if (!existingProduct) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Product doesn't exist!" });
        }
        // delete the product from the cart
        cart.items.filter(p => p.productId.toString() !== productId);
        await cart.save();
        return res.status(StatusCodes.OK).json({
            message: "Product has been removed from your shopping cart successfully!",
            cart
        });
    } catch (error) {
        console.error('Error occured!', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        })
    }

}

export default deleteCart;