const express = require('express'); //
const router = express.Router();
const contactUs = require('../Controller/ContactUsController.js');

router.post('/contact',contactUs.contactcontroller);
router.get('/get-contact',contactUs.getcontactcontroller);
router.delete('/delete-contact/:id',contactUs.deletecontactcontroller);

module.exports = router;