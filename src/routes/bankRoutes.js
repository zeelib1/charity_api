const express = require('express');
// const verifyAuth = require('../authentication/verifyAuth');
const router  = express.Router();
const BankController = require('../controllers/Bank');

router.get('/', BankController.getAll);
router.post('/', BankController.create);

module.exports = router;