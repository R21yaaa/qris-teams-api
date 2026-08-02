const express = require("express");
const router = express.Router();

const { cekRekening } = require("../services/qrisClient");

router.post("/cekrekening", async (req,res)=>{

    try{

        const { bank, rekening } = req.body;

        const hasil = await cekRekening(bank, rekening);

        res.json({
            success:true,
            message:"Browser berhasil dibuka"
        });

    }catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;