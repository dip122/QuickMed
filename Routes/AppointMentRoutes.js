const express = require('express');
const router = express.Router();
const Appointment = require('../Controller/AppointmentController');
const { requireSignIn } = require('../Middlewares/authMiddleware');

router.get('/getallappoints',requireSignIn,Appointment.getallappointscontroller);
router.post('/appointment-book',requireSignIn,Appointment.bookappointmentscontroller);
router.put('/completeappoint',requireSignIn,Appointment.completeappointscontroller);
router.get('/userappointment',requireSignIn,Appointment.userappointscontroller);
// router.post('/isbooked/:id',requireSignIn,Appointment.isbookedscontroller);



module.exports = router;