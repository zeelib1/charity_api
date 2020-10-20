const express = require('express');
const verifyAuth = require('../authentication/verifyAuth');
const router  = express.Router();
const BlogController = require('../controllers/Blog');


router.get('/', verifyAuth, BlogController.getAll);

module.exports = router;