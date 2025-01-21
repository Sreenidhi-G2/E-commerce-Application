const userctrl = require('../controllers.js/userctrl');
const auth = require('../middleware/auth');

const router=require('express').Router();

router.post('/register',userctrl.register)
router.post('/refresh_token',userctrl.refreshToken)
router.post('/login',userctrl.login)
router.get('/logout',userctrl.logout)
router.get('/infor',auth,userctrl.getUser)

module.exports=router;