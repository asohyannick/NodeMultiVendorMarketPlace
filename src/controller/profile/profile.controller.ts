import express from 'express';
import authenticationToken from '../../middleware/auth/authenticationToken.middleware';
import globalValidator from '../../utils/globalValidator';
import { validateProfileRegistration } from '../../utils/validator';
import createProfile from '../../service/impl/profile/createProfile/createProfile.impl';
const router = express.Router();
router.post('/create-profile-account', authenticationToken, globalValidator(validateProfileRegistration), createProfile);
export default router;