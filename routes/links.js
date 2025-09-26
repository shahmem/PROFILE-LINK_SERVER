const express = require("express");
const router = express.Router();
const { AddLinks, GetLinks, updateLink, deleteLink } = require('../controllers/userController');


router.post("/links", AddLinks );
router.get("/links", GetLinks );
router.put("/links/:linkId", updateLink );
router.delete("/links/:linkId", deleteLink );

module.exports = router;