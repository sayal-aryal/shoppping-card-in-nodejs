const express = require('express')
const loginController = require('../controller/loginController')

const router =express.Router();

console.log("inside loginRouter.js line 6")

router.post('/',loginController.authenticate)

module.exports=router;