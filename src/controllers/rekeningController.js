const qrisService = require("../services/qrisService");

async function cekRekening(req, res) {

    try {

        const {

            bankId,

            bankName,

            rekening

        } = req.body;

        const result = await qrisService.cek(

            bankId,

            bankName,

            rekening

        );
        console.log(result);

        res.json(result);

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            status: false,

            error: err.message

        });

    }

}

module.exports = {

    cekRekening

};