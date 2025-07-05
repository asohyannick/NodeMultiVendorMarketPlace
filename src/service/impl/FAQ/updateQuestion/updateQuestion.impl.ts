import { Request, Response } from "express";
import FAQ from "../../../../model/FAQ/FAQ.model";
import { StatusCodes } from "http-status-codes";
const updateQuestion = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const {
            question,
            answer,
            category,
        } = req.body;
        const faq = await FAQ.findByIdAndUpdate(id, {
            question,
            answer,
            category,
            isActive: true,
        }, { new: true, runValidators: true });
        if (!faq) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Question doesn't exist!" });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Question has been fetched successfully!",
            faq
        });
    } catch (error) {
        console.error("Error occured!", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default updateQuestion;