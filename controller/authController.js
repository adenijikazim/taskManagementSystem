const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
// const { createJWT, attachCookiesToResponse } = require('../utils/jwt')
const User = require('../model/userModel')
const BadRequestError = require('../error.js/bad-request')

const register = async(req,res)=>{
    const {email,name,password,role} = req.body
    const emailAlreadyExist = await User.findOne({email})
    
    if(emailAlreadyExist){
        throw new BadRequestError('email already exist')
    }

    const user = await User.create({name,email,password,role})

    /*const token = createJWT({payload:tokenUser})
    res.status(StatusCodes.CREATED).json({user:tokenUser, token})*/

   const userData = {userId:user._id, name:user.name, role:user.role }
   const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES})
    console.log( `auth: ${token}`)

    const oneDay = 1000*60*60*24
    res.cookie('token', token, {
        httpOnly:true,
        expires:new Date(Date.now() + oneDay)
    })
    
    res.status(StatusCodes.CREATED).json({user:userData, token})


   /*const tokenUser = {userId:user._id, name:user.name, role:user.role}
   const token = attachCookiesToResponse({res, user:tokenUser})
   res.status(StatusCodes.CREATED).json({user:tokenUser, token})*/
}

const login = async(req,res)=>{
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequestError('please provide email and password')
    }

    const user = await User.findOne({email})
    if(!user){
        throw new BadRequestError('Invalid login credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new BadRequestError('Invalid login details')
    }

   const tokenUser = {userId:user._id, name:user.name, role:user.role}
    // const token = createJWT({payload:tokenUser})
    const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES})
    console.log(token)
    const oneDay = 1000*60*60*24
    res.cookie('token', token, {
        httpOnly:true,
        expires:new Date(Date.now() + oneDay)
    })
    res.status(StatusCodes.CREATED).json({user:tokenUser,token})
}


const logout = async(req,res)=>{
res.cookie('token', 'logout',{
    httpOnly:true,
    expires:new Date(Date.now()+5*1000)
})
res.status(401).json('logged out')
}

module.exports = {register,login,logout}