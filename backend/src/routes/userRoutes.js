import { Router } from 'express'
import {
  createUser,
  getUsers,
  updateUser,
} from '../controllers/userController.js'
import { createUserVaidation } from '../middlewares/createUserValidation.js'
import {
  emailVerification,
  forgotPassword,
  loginUser,
  resetPassword,
} from '../controllers/authController.js'
import { upload } from '../middlewares/uploadImage.middleware.js'
import protectAuth from '../middlewares/protectAuth.js'

const router = Router()

router.route('/').get(getUsers).post(createUserVaidation, createUser)
router.route('/:link').get(emailVerification)

router.route('/login').post(loginUser)

router
  .route('/update-user')
  .post(protectAuth, upload.single('profileImage'), updateUser)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password/:token').patch(resetPassword)

export default router