require("dotenv").config();

const login = require("./src/services/login");
const checkAccount = require("./src/services/checkAccount");

let page = null;

/**
 * Login sekali saja
 */
async function start() {
    if (page) {
        console.log("QRIS sudah login.");
        return;
    }

    const browserData = await login();

    page = browserData.page;

    console.log("Masuk halaman Check Account...");

    await page.goto(
        "https://qrisajaib.com/check-account",
        {
            waitUntil: "networkidle"
        }
    );

    console.log("Halaman Check Account siap.");
}

/**
 * Cek rekening
 */
async function cek(bank, rekening) {

    if (!page) {
        throw new Error("QRIS belum login.");
    }

    return await checkAccount(
        page,
        bank,
        rekening
    );
}

/**
 * TEST
 */
(async () => {

    try {

        await start();

        const hasil = await cek(
            "BCA",
            "7016007900"
        );

        console.log("==============================");
        console.log(hasil);
        console.log("==============================");

        // Browser tetap hidup
        await page.pause();

    } catch (err) {

        console.error(err);

    }

})();

module.exports = {
    start,
    cek
};