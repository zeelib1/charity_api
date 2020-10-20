const express = require('express');
const router  = express.Router();
const WorldBankController = require('../controllers/WorldBank');


router.get('/', WorldBankController.getAll);

module.exports = router;