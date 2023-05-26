const express = require('express')
const logoutController = require('../controller/logoutController')

const router =express.Router();

router.post('/',logoutController.logOut)

module.exports=router;