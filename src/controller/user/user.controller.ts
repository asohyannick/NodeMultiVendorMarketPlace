import express from 'express';
import globalValidator from '../../utils/globalValidator';
import { validateUserRegistration } from '../../utils/validator';
import register from '../../service/impl/user/register/register.impl';
const router = express.Router();
router.post('/create-account', globalValidator(validateUserRegistration), register);
export default router;