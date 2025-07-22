const express = require("express");
const { createPetition, getPetitions } = require("../controllers/petitionController");
const router = express.Router();

router.post("/", createPetition);
router.get("/", getPetitions);

module.exports = router;
