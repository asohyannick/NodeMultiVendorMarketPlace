import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import WishList from "../../../../model/wishList/wishList.model";
const showWishLists = async(_req: Request, res: Response): Promise<Response> => {
    try {
        const wishlists = await WishList.find();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Wishlists have been fetched successfully!",
            wishlists,
        });
    } catch (error) {
        console.error('Error occured!', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default showWishLists;