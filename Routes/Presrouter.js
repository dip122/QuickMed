const express = require('express'); 
const { requireSignIn } = require('../Middlewares/authMiddleware');
const PresController = require('../Controller/PresController');
const router = express.Router();


router.post('/post-prescription',requireSignIn,PresController.postprescriptioncontroller);
router.get('/get-prescription',requireSignIn,PresController.getprescriptioncontroller);
router.delete('/delete-prescription/:id',requireSignIn,PresController.deleteprescriptioncontroller);


module.exports = router;