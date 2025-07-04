import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import WishList from "../../../../model/wishList/wishList.model";
const updateWishList = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { userId, items } = req.body;
        const wishlist = await WishList.findByIdAndUpdate(id, { userId, items }, { new: true, runValidators: true});
        if (!wishlist) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "WishList doesn't exist!"});
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Wishlist has been updated successfully!",
            wishlist,
        });
    } catch (error) {
        console.error('Error occured!', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default updateWishList;