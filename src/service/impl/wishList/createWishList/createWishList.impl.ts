import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import WishList from "../../../../model/wishList/wishList.model";
const createWishList = async (req: Request, res: Response): Promise<Response> => {
    const { userId, items } = req.body;
    try {
        const newItem = new WishList({
            userId,
            items
        });
        await newItem.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "A new wishlist has been created successfully!",
            newItem,
        });
    } catch (error) {
        console.error('Error occured!', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default createWishList;