import crypto from 'crypto'
import { mongoose, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
  accessTokenExpires,
  accessTokenSecret,
  refreshTokenExpires,
  refreshTokenSecret,
} from '../config/index.js'

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Password minimum length is 8'],
    },
    emailVerified: {
      type: Date,
    },
    profileImage: {
      type: String,
    },
    publicId: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'seller', 'admin', 'editor'],
      lowercase: true,
      default: 'user',
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: Date,
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// hash password
userSchema.pre('save', async function (next) {
  // only run thus function if password was actually modified
  if (!this.isModified('password')) return next()

  // hash password with cost of 10
  this.password = await bcrypt.hash(this.password, 10)

  next()
})

// check password is correct or not
userSchema.methods.correctPassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password)
}

// generate accessToken and refreshToken
userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      fullName: this.fullName,
      role: this.role
    },
    accessTokenSecret,
    { expiresIn: accessTokenExpires }
  )
}

userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      fullName: this.fullName,
      role: this.role
    },
    refreshTokenSecret,
    { expiresIn: refreshTokenExpires }
  )
}

// jwt token verification
userSchema.methods.verifyAccessToken = async function (token) {
  return jwt.verify(token, accessTokenSecret, function (err, decoded) {
    if (err) {
      return null
    }
    return decoded
  })
}

// generate password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  console.log({ resetToken }, this.passwordResetToken)

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}

const User = mongoose.model('User', userSchema)

export default User