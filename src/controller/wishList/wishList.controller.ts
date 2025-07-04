import express from 'express';
import authenticationToken from '../../middleware/auth/authenticationToken.middleware';
import createWishList from '../../service/impl/wishList/createWishList/createWishList.impl';
import globalValidator from '../../utils/globalValidator';
import { updateReviewValidationSchema, wishListValidationSchema } from '../../utils/validator';
import showWishLists from '../../service/impl/wishList/showWishLists/showWishLists.impl';
import showWishList from '../../service/impl/wishList/showWishList/showWishList.impl';
import updateWishList from '../../service/impl/wishList/updateWishList/updateWishList.impl';
const router = express.Router();
router.post('/create-wishlist', authenticationToken, globalValidator(wishListValidationSchema), createWishList);
router.get('/show-wishlists', authenticationToken, showWishLists);
router.get('/show-wishlist/:id', authenticationToken, showWishList);
router.put('/update-wishlist/:id', authenticationToken,globalValidator(updateReviewValidationSchema), updateWishList);

export default router;