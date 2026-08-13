const login = require("./login");
const checkAccount = require("./checkAccount");

let page = null;
let browser = null;
let isLoggingIn = false;

// Queue agar satu browser tidak dipakai dua request sekaligus
let queue = Promise.resolve();

async function start() {

    if (
        page &&
        browser &&
        !page.isClosed()
    ) {
        return page;
    }

    if (isLoggingIn) {

        while (isLoggingIn) {
            await new Promise(resolve =>
                setTimeout(resolve, 300)
            );
        }

        return page;
    }

    isLoggingIn = true;

    try {

        console.log("==============================");
        console.log("START QRIS BACKEND");
        console.log("==============================");

        const result = await login();

        browser = result.browser;
        page = result.page;

        console.log(
            "✅ QRIS BACKEND READY"
        );

        return page;

    } finally {

        isLoggingIn = false;

    }
}

async function resetSession() {

    console.log(
        "⚠️ RESET QRIS BACKEND SESSION"
    );

    try {

        if (browser) {
            await browser.close();
        }

    } catch (err) {}

    browser = null;
    page = null;
}

async function cek(
    bankId,
    bankName,
    rekening
) {

    // Request masuk antrean
    const previous = queue;

    let release;

    queue = new Promise(resolve => {
        release = resolve;
    });

    await previous;

    try {

        if (
            !page ||
            !browser ||
            page.isClosed()
        ) {
            await start();
        }

        // Pastikan session benar-benar masih di halaman check account
        if (
            page.url().includes("/login")
        ) {

            console.log(
                "⚠️ QRIS BACKEND LOGOUT"
            );

            await resetSession();
            await start();
        }

        // Pastikan form tersedia
        await page.locator("#bank_id").waitFor({
            state: "visible",
            timeout: 15000
        });

        return await checkAccount(
            page,
            bankId,
            bankName,
            rekening
        );

    } catch (err) {

        console.log(
            "❌ QRIS ERROR:",
            err.message
        );

        /*
         * Jangan langsung login ulang
         * hanya karena error biasa.
         *
         * Cek apakah memang logout.
         */

        if (
            page &&
            !page.isClosed() &&
            page.url().includes("/login")
        ) {

            console.log(
                "⚠️ SESSION BENAR-BENAR LOGOUT"
            );

            await resetSession();
            await start();

            return await checkAccount(
                page,
                bankId,
                bankName,
                rekening
            );
        }

        throw err;

    } finally {

        release();

    }
}

module.exports = {
    start,
    cek
};