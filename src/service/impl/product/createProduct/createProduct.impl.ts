import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Product from "../../../../model/product/product.model";
import { ProductStatus } from '../../../interfac/product/product.interfac';
const createProduct = async (req: Request, res: Response): Promise<Response> => {
    const {
        name,
        description,
        price,
        stockQuantity,
        ratings,
        tags,
    } = req.body;
    // check if files are provided
    if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
        return res.status(StatusCodes.NOT_FOUND).json({message: "No files have been uploaded!"});
    }
    // Extract files url
    const imageURLs = (req.files as Express.Multer.File[]).map(file => file.path);
    try {
        const newProduct = new Product({
            name,
            description,
            price,
            stockQuantity,
            images: imageURLs,
            ratings,
            tags,
            status: ProductStatus.AVAILABLE,
        });
        await newProduct.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "A new product has been created successfully!",
            newProduct
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default createProduct;