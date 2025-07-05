import express from 'express';
import authenticationToken from '../../middleware/auth/authenticationToken.middleware';
import globalValidator from '../../utils/globalValidator';
import { faqValidationSchema } from '../../utils/validator';
import createQuestion from '../../service/impl/FAQ/createQuestion/createQuestion.impl';
const router = express.Router();
router.post('/create-question', authenticationToken, globalValidator(faqValidationSchema), createQuestion);
export default router;