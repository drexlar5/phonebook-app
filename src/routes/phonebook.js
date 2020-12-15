const express = require('express');
const router = express.Router();
const phoneBookController = require('../controller/phonebook');

const isAuth = require('../middleware/is-auth');
const validate = require('../middleware/validation');
const { phoneBookValidation, phoneBookEditValidation } = require('../schema/phonebook');

router.post('/phonebook/add', isAuth, validate(phoneBookValidation), phoneBookController.addPhoneBook);
router.patch('/phonebook/update/:id', isAuth, validate(phoneBookEditValidation), phoneBookController.updatePhoneBook);

module.exports = router;