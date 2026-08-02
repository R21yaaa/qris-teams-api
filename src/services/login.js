const { chromium } = require("playwright");

async function login(){

    const browser = await chromium.launch({
        headless: true,
        slowMo:500
    });

    const page = await browser.newPage();

    await page.goto("https://qrisajaib.com/login",{
        waitUntil:"domcontentloaded"
    });
    console.log("URL:", page.url());

await page.screenshot({
    path: "halaman-check-account.png",
    fullPage: true
});

const html = await page.content();
require("fs").writeFileSync("halaman.html", html);

    console.log("Halaman:", page.url());

    await page.locator('input[name="email"]').fill(process.env.EMAIL);

    await page.locator('input[name="password"]').fill(process.env.PASSWORD);

    console.log("Klik Login");

    await page.locator('button[type="submit"]').click();

    await page.waitForTimeout(5000);

    console.log("URL sekarang :", page.url());

    console.log("Login selesai");

    return { browser, page };
}

module.exports = login;