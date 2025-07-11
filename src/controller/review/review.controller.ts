import express from 'express';
import authenticationToken from '../../middleware/auth/authenticationToken.middleware';
import globalValidator from '../../utils/globalValidator';
import { reviewValidationSchema, updateReviewValidationSchema } from '../../utils/validator';
import createReview from '../../service/impl/review/createReview/createReview.impl';
import showReviews from '../../service/impl/review/showReviews/showReviews.impl';
import showReview from '../../service/impl/review/showReview/showReview.impl';
import updateReview from '../../service/impl/review/updateReview/updateReview.impl';
import deleteReview from '../../service/impl/review/deleteReview/deleteReview.impl';
const router = express.Router();
router.post('/create-review', authenticationToken, globalValidator(reviewValidationSchema), createReview);
router.get('/show-reviews', authenticationToken, showReviews);
router.get('/show-review/:id', authenticationToken, showReview);
router.put('/update-review/:id', authenticationToken, globalValidator(updateReviewValidationSchema), updateReview);
router.delete('/delete-review/:id', authenticationToken, deleteReview);
export default router;