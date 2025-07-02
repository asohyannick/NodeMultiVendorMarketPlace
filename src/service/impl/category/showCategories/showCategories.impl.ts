import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Category from "../../../../model/category/category.model";
const showCategories = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const categories = await Category.find();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Categories have been fetched successfully!",
            categories
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default showCategories;