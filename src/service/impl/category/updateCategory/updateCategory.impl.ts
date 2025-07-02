import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Category from "../../../../model/category/category.model";
const updateCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const {
            name,
            description,
            image,
        } = req.body;
        const category = await Category.findByIdAndUpdate(id, {
            name,
            description,
            image,
            isActive: true,
        }, { new: true, runValidators: true });
        if (category) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Category doesn't exist!" });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Category has been updated successfully!",
            category
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default updateCategory;