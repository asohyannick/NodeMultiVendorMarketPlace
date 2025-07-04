import express from 'express';
import authenticationToken from '../../middleware/auth/authenticationToken.middleware';
import createWishList from '../../service/impl/wishList/createWishList/createWishList.impl';
import globalValidator from '../../utils/globalValidator';
import { wishListValidationSchema } from '../../utils/validator';
const router = express.Router();
router.post('/create-wishlist', authenticationToken, globalValidator(wishListValidationSchema), createWishList);
export default router;