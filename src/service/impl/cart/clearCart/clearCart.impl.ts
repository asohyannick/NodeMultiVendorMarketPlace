import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../../../../model/user/user.model";
const clearCart = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        // check if the cart exist
        const user = await User.findById(id);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Cart doesn't exist!" });
        }
        user.cart = [];
        await user.save();
        return res.status(StatusCodes.OK).json({message: "Cart has been cleared successfully!"});
    } catch (error) {
        console.error('Error occured!', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default clearCart;