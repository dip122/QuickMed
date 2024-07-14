const Notification = require("../Controller/NotificationController");
const { requireSignIn } = require("../Middlewares/authMiddleware");

const express = require('express');
const router = express.Router();

router.get('/get-notification',requireSignIn,Notification.getallnotification);
router.delete('/delete-notification/:id',requireSignIn,Notification.deleteallnotification);
module.exports = router;