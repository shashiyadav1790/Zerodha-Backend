const { Signup ,Login } = require("../controller/AuthController");
const {userVerification} = require('../Middleware/AuthMiddleware.js')
const router = require("express").Router();
router.post('/',userVerification);
router.post("/signup", Signup); 
router.post('/login',Login)
module.exports = router;