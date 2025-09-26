const express = require("express");
const router = express.Router();
const { createProfile, GetProfile } = require('../controllers/userController');

router.post('/', createProfile);
router.get('/', GetProfile);

module.exports = router;
 