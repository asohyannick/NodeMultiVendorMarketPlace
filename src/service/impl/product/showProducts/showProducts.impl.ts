import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Product from "../../../../model/product/product.model";
const showProducts = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const products = await Product.find();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Products have been fetched successfully!",
            products
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default showProducts;