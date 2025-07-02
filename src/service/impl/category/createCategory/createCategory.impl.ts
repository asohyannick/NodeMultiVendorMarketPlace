import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Category from "../../../../model/category/category.model";
const createCategory = async (req: Request, res: Response): Promise<Response> => {
    const {
        name,
        description,
        image,
    } = req.body;
    try {
        const newCategory = new Category({
            name,
            description,
            image,
            isActive: true,
        });
        await newCategory.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "A new category has been created successfully!",
            newCategory
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default createCategory;