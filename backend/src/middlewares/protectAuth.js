import jwt from "jsonwebtoken"
import User from '../models/userModel.js'



export const protectAuth = async (req, res, next) =>{
  try{
    const token = req.header("Authorization")?.replace("Murad"," ")
    //console.log(token);
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, result) {
       if(err){
        return null
       } else {
        return result
       }
    })

    console.log("assaa", decodedToken);

    if(!decodedToken){
      return res.json("invalid token")
    }
     const user = await User.findById(decodedToken.id)

       if(!user){
         return res.json("invalid token")
       }
       req.user = user 
         next()
  } catch(error){
    console.log("auth", error)
  }

}


 

{/*
import jwt from 'jsonwebtoken'
import { accessTokenSecret } from '../config/index.js'
import apiResponse from 'quick-response'
import User from '../models/userModel.js'

const protectAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    // verify the token
    const decodedToken = jwt.verify(
      token,
      accessTokenSecret,
      (err, decoded) => {
        if (err) {
          return null
        }
        return decoded
      }
    )
    if (!decodedToken) {
      return res.status(401).json(apiResponse(401, 'invalid token'))
    }

    // find user from the decoded token
    const user = await User.findById(decodedToken.id)
    if (!user) {
      return res.status(404).json(apiResponse(404, 'invalid token'))
    }
    req.user = user

    next()
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, 'server error', { error: error.message }))
  }
}

export default protectAuth

*/}





