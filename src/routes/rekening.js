const express = require("express");

const router = express.Router();

const {
    cekRekening,
} = require("../controllers/rekeningController");

router.post(
    "/cekrekening",
    cekRekening
);

module.exports = router;