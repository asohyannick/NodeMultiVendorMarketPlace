import Cart from "../../../../model/cart/cart.model";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Product from "../../../../model/product/product.model";
const addProductToCart = async (req: Request, res: Response): Promise<Response> => {
    const { userId, productId, stockQuantity } = req.body;
    try {
        // Check if the user's cart exist and if it doesn't exist, create a new cart for the user
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [] })
        }
        // check if the product exist
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found!" });
        }
        // check if a product or item already exist in the cart 
        const existingItem = cart.items.find(p => p.productId.toString() === productId);
        if (existingItem) {
            return existingItem.stockQuantity = stockQuantity;
        } else {
            // add a new product to the cart
            cart.items.push({ productId, stockQuantity });
        }
        // save the cart
        await cart.save();
        return res.status(StatusCodes.CREATED).json({ 
            success: true,
            message: "A new product has been added successfully to your shopping cart",
            cart 
        });
    } catch (error) {
        console.error('Error occured!', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        })
    }

}

export default addProductToCart;