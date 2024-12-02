import apiResponse from 'quick-response'
import User from '../models/userModel.js'
import sendVerificationEmail from '../utils/sendUserVerficationMail.js'
import verifyEmailTemplate from '../templates/verifyEmailTemplate.js'
import { cloudinaryUpload } from '../services/cloudinary.js'
//import { cloudinaryUpload } from '../services/cloudinary.js'

// @desc get all users
// route GET /api/v1/users
const getUsers = (req, res) => {
  return res.json({ message: 'Hello from the server' })
}

// @desc create a user
// route POST /api/v1/users
const createUser = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, password,role } = req.body

    // check user already registered or not
    const isUserFound = await User.findOne({ email })
    if (isUserFound) {
      return res
        .status(400)
        .json(apiResponse(400, 'email already exist', { isUserFound }))
    }

    let user 
    if(role){
      user = await User.create({
       fullName,
       phoneNumber,
       email,
       password,
       role
     })

    } else{
       user = await User.create({
        fullName,
        phoneNumber,
        email,
        password,
        role
      })
    }

    let link = await user.generateAccessToken()

    console.log( "link", link)

    await sendVerificationEmail(user.email, verifyEmailTemplate(link))

    return res.status(201).json(apiResponse(201, 'user created', { user }))
  } catch (err) {
    return res
      .status(500)
      .json(apiResponse(500, 'internal server error', { err }))
  }
}

// @desc create a user
// route POST /api/v1/users
const updateUser = async (req, res) => {
 try{
   if(req.file){
      const { path } = req.file
      const user = await User.findById(req.user._id)
      if(user){
        const result = await cloudinaryUpload(path, user.fullName, "profileImage")
        user.profileImage = result.optimizeUrl
        user.publicId = result.uploadResult.publicId
        await user.save()
        res.json(apiResponse(200, "avatar uploaded", {user}))
      }
   }
 } catch(error){
   console.log(error)
 }
 //res.json("Please Upload Your Image")
}

//logout opcation

const logout = async (req, res) =>{
  try{
    const user = await User.findById(req.user.id)
    user.refreshToken = null
    await user.save()
    return res.json(apiResponse(200, "logout successfully done"))
  } catch(error){
    console.log(error)
  }
}

const getUser = async (req, res) =>{
  try {
    const { id } = req.params
    const user = await User.findById({_id: id}).select("-password -refreshToken")
    return res.json(apiResponse(200, "user details", user))
  } catch (error) {
    console.log(error)
  }
}




export { createUser, getUsers, updateUser, logout, getUser }















{/*

const updateUser = async (req, res) => {
  try {
    // check file uploaded or not
    if (req.file) {
      const { path } = req.file
      const user = await User.findById(req.user._id)

      if (user) {
        const cloudinaryImage = await cloudinaryUpload(
          path,
          user.fullName,
          'profileImage'
        )
        // cloudinaryImage.optimizeUrl || cloudinaryImage.uploadResult || cloudinaryImage.uploadResult.public_id
        user.profileImage = cloudinaryImage.optimizeUrl
        user.publicId = cloudinaryImage.uploadResult.public_id
        await user.save()

        return res
          .status(200)
          .json(apiResponse(200, 'profile image upload successfully'))
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, 'internal server error', { error: error.message }))
  }
}
*/}