const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favorites');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, favoritesController.addToFavorites);
router.post('/remove', authMiddleware, favoritesController.removeFromFavorites);
router.get('/', authMiddleware, favoritesController.getFavorites);

module.exports = router;