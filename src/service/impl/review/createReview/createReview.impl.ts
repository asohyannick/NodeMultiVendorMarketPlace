import Review from "../../../../model/review/review.model";
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
const createReview = async (req: Request, res: Response): Promise<Response> => {
    const {
        rating,
        title,
        comment,
        images,
        helpfulCount,
        reported,
    } = req.body;
    try {
        const newReview = new Review({
            rating,
            title,
            comment,
            images,
            helpfulCount,
            reported,
        });
        await newReview.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "A new product review has been added successfully!",
            newReview,
        })
    } catch (error) {
        console.error("Error occured!", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default createReview;