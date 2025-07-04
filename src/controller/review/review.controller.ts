import express from 'express';
import authenticationToken from '../../middleware/auth/authenticationToken.middleware';
import globalValidator from '../../utils/globalValidator';
import { reviewValidationSchema } from '../../utils/validator';
import createReview from '../../service/impl/review/createReview/createReview.impl';
const router = express.Router();
router.post('/create-review', authenticationToken, globalValidator(reviewValidationSchema), createReview);
export default router;