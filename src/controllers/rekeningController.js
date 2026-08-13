async function cekRekening(req, res) {

    return res.status(503).json({
        status: false,
        maintenance: true,
        message: "Service sedang dalam maintenance. Silakan coba kembali nanti."
    });

    // kode lama di bawah ini
}