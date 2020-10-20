const express = require('express');
const router  = express.Router();
const UserController = require('../controllers/User');

router.post('/create', UserController.create);
router.get('/', UserController.getAll);

module.exports = router;