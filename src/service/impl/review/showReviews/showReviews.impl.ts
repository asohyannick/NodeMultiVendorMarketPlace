import Review from "../../../../model/review/review.model";
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
const showReviews = async(_req: Request, res: Response): Promise<Response> => {
    try {
        const reviews = await Review.find();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Product reviews have been fetched successfully!",
            reviews,
        })
    } catch (error) {
        console.error("Error occured!", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default showReviews;