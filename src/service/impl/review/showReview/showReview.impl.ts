import Review from "../../../../model/review/review.model";
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
const showReview = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);
        if (!review) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Product review doesn't exist!"});
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Product review has been fetched successfully!",
            review,
        })
    } catch (error) {
        console.error("Error occured!", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default showReview;