import express from 'express';
import authenticationToken from '../../middleware/auth/authenticationToken.middleware';
import addProductToCart from '../../service/impl/cart/addProductToCart/addProductToCart.impl';
import globalValidator from '../../utils/globalValidator';
import { cartValidationSchema, updateCartValidationSchema } from '../../utils/validator';
import updateCart from '../../service/impl/cart/updateCart/updateCart.impl';
import deleteCart from '../../service/impl/cart/deleteCart/deleteCart.impl';
import clearCart from '../../service/impl/cart/clearCart/clearCart.impl';
import showCartItems from '../../service/impl/cart/showCartItems/showCartItems.impl';
import showCartItem from '../../service/impl/cart/showCartItem/showCartItem.impl';
const router = express.Router();
router.post('/add-product-to-cart', authenticationToken, globalValidator(cartValidationSchema),addProductToCart);
router.get('/show-cart-items', authenticationToken, showCartItems);
router.get('/show-cart-item/:id', authenticationToken, showCartItem);
router.put('/update-cart', authenticationToken, globalValidator(updateCartValidationSchema), updateCart);
router.delete('/delete-cart/:userId/:productId', authenticationToken, deleteCart);
router.delete('/clear-cart/:userId', authenticationToken, clearCart);
export default router;