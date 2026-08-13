const puppeteer = require("puppeteer");

let browser = null;
let page = null;

async function startBrowser() {

    if (browser && browser.isConnected()) {
        return page;
    }

    browser = await puppeteer.launch({

        headless: false,

        userDataDir: "./session",

        defaultViewport: null,

        args: [
    "--start-maximized",
    "--disable-session-crashed-bubble",
    "--disable-infobars",

    "--disable-background-timer-throttling",
    "--disable-backgrounding-occluded-windows",
    "--disable-renderer-backgrounding",
    "--disable-features=CalculateNativeWinOcclusion"
]

    });

    const pages = await browser.pages();

    page = pages.find(p =>
        p.url().includes("teams.live.com")
    );

    if (!page) {

        page = await browser.newPage();

        await page.goto("https://teams.live.com", {

            waitUntil: "networkidle2"

        });

    }

    process.on("SIGINT", async () => {

        console.log("\nClosing Browser...");

        if (browser)
            await browser.close();

        process.exit(0);

    });

    return page;

}

module.exports = {

    startBrowser

};