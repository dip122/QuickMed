const express = require('express'); 
const UserController = require('../Controller/authcontroller');
const {requireSignIn} = require('../Middlewares/authMiddleware');
const router = express.Router();


router.post('/login',UserController.logincontroller);
router.post('/register',UserController.registercontroller);
router.get('/getalluser',requireSignIn,UserController.getallusercontroller);
router.post('/update-password',requireSignIn,UserController.updatepasswordcontroller);
router.post('/update-contact',requireSignIn,UserController.updatecontactcontroller);
router.delete('/delete-profile',requireSignIn,UserController.deleteusercontroller);
router.post('/forget-password',UserController.forgetpasswordcontroller);
router.post('/resetpassword/:token',UserController.resetpasswordcontroller);



//testing purpose
router.get('user-auth',requireSignIn,(req,res)=>{
    return res.status(200).send({'success' : true});
})


//export 
module.exports = router;