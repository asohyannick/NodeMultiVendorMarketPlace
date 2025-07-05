import { Request, Response } from "express";
import FAQ from "../../../../model/FAQ/FAQ.model";
import { StatusCodes } from "http-status-codes";
const showQuestion = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const question = await FAQ.findById(id);
        if (!question) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Question doesn't exist!"});
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Question has been fetched successfully!",
            question
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

export default showQuestion;