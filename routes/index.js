const express = require('express');
const router = express.Router();

const index_controller = require('../controllers/indexController');

// Index Route
router.get('/', index_controller.get_index_page);

// About Route
router.get('/about', index_controller.get_about_page);

module.exports = router;