const User = require('../model/userModel')
const {StatusCodes} = require('http-status-codes')
const { attachCookiesToResponse } = require('../utils/jwt')
const { checkPermissions } = require('../middleware/authenticate')
const BadRequestError = require('../error.js/bad-request')

const getAllusers = async(req,res)=>{
    const users = await User.find({role:'user'}).select('-password')
    res.status(StatusCodes.OK).json({users})
    
}

const getUser = async(req,res)=>{
    const user = await User.findOne({_id:req.params.id}).select('-password')
    if(!user){
        res.send(`No user with id ${req.params.id}`)
    }
    // checkPermissions(req.user, user._id)
    res.status(StatusCodes.OK).json({user})
    

}
const showCurrentuser = (req,res)=>{
    res.status(StatusCodes.OK).json({user:req.user})
}

const updateUser = async(req,res)=>{
    const {name, email} = req.body
    const user = await User.findOne({_id:req.user.userId})
        user.name = name
        user.email = email
        await user.save()
   const tokenUser = {userId:user._id, name:user.name, role:user.role}
   const token = attachCookiesToResponse({res, user:tokenUser})
   res.status(StatusCodes.CREATED).json({user:tokenUser})

}
const updateUserPassword = async(req,res)=>{
    const {oldPassword, newPassword} = req.body
    if(!oldPassword || !newPassword){
        throw new BadRequestError('please enter old and new password')
    }

  const user = await User.findOne({_id:req.user.userId})
 const isPasswordCorrect = await user.comparePassword(oldPassword)
 if(!isPasswordCorrect){
    throw new UnauthenticatedError('Invalid login credentilas')
 }
 user.password = newPassword
 await user.save({validateBeforeSave:false})
 res.status(StatusCodes.OK).json({msg:'success! password updated'})
}

module.exports = {getAllusers,getUser,showCurrentuser,updateUser,updateUserPassword}