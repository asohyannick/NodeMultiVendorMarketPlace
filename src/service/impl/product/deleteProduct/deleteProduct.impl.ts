import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Product from "../../../../model/product/product.model";
const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Product doesn't exist!"});
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Product has been deleted successfully!",
            product
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default deleteProduct;