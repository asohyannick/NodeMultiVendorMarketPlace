import { Request, Response } from "express";
import FAQ from "../../../../model/FAQ/FAQ.model";
import { StatusCodes } from "http-status-codes";
const createQuestion = async(req: Request, res: Response): Promise<Response> => {
    const { question, answer, category } = req.body;
    try {
        const newQuestion = new FAQ({
            question,
            answer,
            category,
            isActive: true,
        });
        await newQuestion.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "A new question has been asked successfully!",
            newQuestion
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

export default createQuestion;