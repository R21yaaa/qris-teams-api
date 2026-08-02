const login = require("./login");
const checkAccount = require("./checkAccount");

let page = null;
let browser = null;

async function start() {

    if (page) {
        console.log("QRIS sudah login.");
        return;
    }

    console.log("Login ke QRIS...");

    const result = await login();

    browser = result.browser;
    page = result.page;

    console.log("Membuka halaman Check Account...");

    await page.goto(
        "https://qrisajaib.com/check-account",
        {
            waitUntil: "networkidle"
        }
    );

    console.log("Check Account siap.");
}

async function cek(bankId, bankName, rekening) {

    if (!page) {
        throw new Error("QRIS belum login.");
    }

    return await checkAccount(
        page,
        bankId,
        bankName,
        rekening
    );
}

module.exports = {
    start,
    cek
};