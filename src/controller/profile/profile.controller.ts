import express from 'express';
import authenticationToken from '../../middleware/auth/authenticationToken.middleware';
import globalValidator from '../../utils/globalValidator';
import { validateProfileRegistration, validateUpdatedProfileRegistration } from '../../utils/validator';
import createProfile from '../../service/impl/profile/createProfile/createProfile.impl';
import showProfiles from '../../service/impl/profile/showProfiles/showProfiles.impl';
import showProfile from '../../service/impl/profile/showProfile/showProfile.impl';
import updateProfile from '../../service/impl/profile/updateProfile/updateProfile.impl';
import deleteProfile from '../../service/impl/profile/deleteProfile/deleteProfile.impl';
const router = express.Router();
router.post('/create-profile-account', authenticationToken, globalValidator(validateProfileRegistration), createProfile);
router.get('/show-profiles', authenticationToken, showProfiles);
router.get('/show-profile/:id', authenticationToken, showProfile);
router.put('/update-profile/:id', authenticationToken, globalValidator(validateUpdatedProfileRegistration), updateProfile);
router.delete('/delete-profile/:id', authenticationToken, deleteProfile);
export default router;