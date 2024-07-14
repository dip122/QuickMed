const express = require('express');
const { requireSignIn } = require('../Middlewares/authMiddleware');
const DoctorController = require('../Controller/DoctorController')
const router = express.Router();


router.post('/applyasdoctor',requireSignIn,DoctorController.applydoctorcontroller)
router.get('/getalldoctors',requireSignIn,DoctorController.getalldoctorcontroller)
router.get('/getapplieddoctors',requireSignIn,DoctorController.getapplieddoctorscontroller)
router.get('/getdetails/:id',requireSignIn,DoctorController.getdetailscontroller)
router.put('/accept',requireSignIn,DoctorController.acceptdoctorcontroller)
router.put('/reject',requireSignIn,DoctorController.rejectdoctorcontroller)
router.put('/update-profile-image',requireSignIn,DoctorController.updateprofileimagecontroller)
router.post('/deletedoctor',requireSignIn,DoctorController.deletedoctorcontroller);

module.exports = router;