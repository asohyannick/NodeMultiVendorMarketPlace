import express from 'express';
import authenticationToken from '../../middleware/auth/authenticationToken.middleware';
import globalValidator from '../../utils/globalValidator';
import { categoryValidationSchema } from '../../utils/validator';
import createCategory from '../../service/impl/category/createCategory/createCategory.impl';
const router = express.Router();
router.post('/create-category', authenticationToken, globalValidator(categoryValidationSchema), createCategory);
export default router;