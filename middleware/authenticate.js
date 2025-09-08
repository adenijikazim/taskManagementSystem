const jwt = require('jsonwebtoken')
const UnauthenticatedError = require('../error.js/unathenticated')
const UnauthorizedError = require('../error.js/unathorized')

const authenticateUser = (req,res,next)=>{
const token = req.cookies.token
// console.log(token)
console.log( `auth: ${token}`)



if (!token){
throw new UnauthenticatedError('No token present')

}
try {
    const {name,userId,role} = jwt.verify(token, process.env.JWT_SECRET)
    console.log(payload)
    req.user = {
        name,userId,role,email
    }
    // const payload = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(payload)
    // req.user = {
    //     userId: '6655af7fa8264d684a1252dc',
    //     name: 'Qhadeejah',
    //     role: 'admin'
      
    // }
    next()
} catch (error) {
    throw new UnauthenticatedError('Invalid token')
    
}
}



const authorizeUser= (role)=>{
    return (req,res,next)=>{
        if(req.user.role !== role){
          throw new UnauthorizedError('You are not authorized to access this route')

        }
        next()
    }
   
}




// const authorizedRoles = (...roles) => {
//     return (req, res, next) => {
//       if (!roles.includes(req.user.role)) {
//         throw new UnauthorizedError(
//           'Unauthorized to access this route'
//         );
//       }
//       next();
//     };
//   };



const checkPermissions = (requestUser, resourceUserId)=>{
    if(requestUser.role === 'admin') return
    if(requestUser.userId === resourceUserId.toString()) return
    throw new UnauthorizedError('You are not authorized to access this route')
}

module.exports = {authenticateUser,authorizeUser, checkPermissions}