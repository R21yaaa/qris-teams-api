const { chromium } = require("playwright");

let browser = null;
let page = null;

async function startQRIS() {

    if (page && !page.isClosed()) {
        return page;
    }

    browser = await chromium.launchPersistentContext(
    "./playwright-profile",
    {
        headless: false,
        viewport: null,

        args: [
            "--disable-background-timer-throttling",
            "--disable-backgrounding-occluded-windows",
            "--disable-renderer-backgrounding",
            "--disable-features=CalculateNativeWinOcclusion"
        ]
    }
);

    page = browser.pages()[0] || await browser.newPage();

    await page.goto(
        "https://qrisajaib.com/check-account",
        {
            waitUntil: "networkidle"
        }
    );

    // Kalau session masih hidup
    if (await page.locator("#bank_id").count()) {

        console.log("✅ QRIS Ready");

        return page;

    }

    await page.goto(
    "https://qrisajaib.com/login",
    {
        waitUntil: "networkidle"
    }
);

await page.locator('input[name="email"]').fill(
    process.env.EMAIL
);

await page.locator('input[name="password"]').fill(
    process.env.PASSWORD
);

await page.locator('button[type="submit"]').click();

await page.waitForURL("**/check-account");

console.log("✅ Login QRIS berhasil");

    return page;

}

module.exports = {
    startQRIS
};