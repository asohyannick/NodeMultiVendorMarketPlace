import Cart from "../../../../model/cart/cart.model";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Product from "../../../../model/product/product.model";
const updateCart = async (req: Request, res: Response): Promise<Response> => {
    const { userId, productId, stockQuantity } = req.body;
    try {
       const cart = await Cart.findOne({userId});
       if (!cart) {
          return res.status(StatusCodes.NOT_FOUND).json({message: "Cart doesn't exist!"})
       }
       const product = await Product.findById(productId);
       if (!product) {
          return res.status(StatusCodes.NOT_FOUND).json({message: "Product doesn't exist"});
       }
       const updateItem = cart.items.find(p => p.productId.toString() === productId);
       if (updateItem) {
           product.stockQuantity = stockQuantity;
           await cart.save();
       }
       return res.status(StatusCodes.OK).json({
         message: "Product has been updated successfully!",
         updateItem,
       });
    } catch (error) {
        console.error('Error occured!', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        })
    }

}

export default updateCart;