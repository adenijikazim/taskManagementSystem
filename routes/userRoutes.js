const express = require('express')
const { getAllusers, updateUser, updateUserPassword, getUser, showCurrentuser,  } = require('../controller/userController')
const { authenticateUser,authorizeUser } = require('../middleware/authenticate')
const router = express.Router()

router.route('/').get(authenticateUser,authorizeUser, getAllusers)
router.get('/showMe',authenticateUser, showCurrentuser)

router.route('/:id')
.patch(authenticateUser,authorizeUser,updateUser)

.get(authenticateUser,authorizeUser('admin'),getUser)
.patch(authenticateUser,updateUserPassword)

module.exports = router
