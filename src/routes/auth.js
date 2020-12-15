const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

const validate = require('../middleware/validation');
const { authValidation } = require('../schema/auth');

router.post('/register', validate(authValidation), authController.createUser);
router.post('/login', validate(authValidation), authController.authenticateUser);

module.exports = router;