const express = require('express');
const router = express.Router();

const destinationsCtrl = require('../controllers/destinations');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
router.get('/', destinationsCtrl.index);

router.get('/new', ensureLoggedIn, destinationsCtrl.new);
router.get('/:id', destinationsCtrl.show);
router.post('/', ensureLoggedIn, destinationsCtrl.create);
	
module.exports = router;