const parseResult = require("./parser");

async function loginQRIS(page) {

    const MAX_RETRY = 3;

    for (let attempt = 1; attempt <= MAX_RETRY; attempt++) {

        try {

            console.log("=================================");
            console.log(`QRIS LOGIN ATTEMPT ${attempt}/${MAX_RETRY}`);
            console.log("=================================");

            await page.goto(
                "https://qrisajaib.com/login",
                {
                    waitUntil: "domcontentloaded",
                    timeout: 30000
                }
            );

            await page.locator('input[name="email"]').waitFor({
                state: "visible",
                timeout: 10000
            });

            await page.locator('input[name="email"]').fill(
                process.env.EMAIL
            );

            await page.locator('input[name="password"]').fill(
                process.env.PASSWORD
            );

            await page.locator('button[type="submit"]').click();

            console.log("Login QRIS dikirim...");

            await page.waitForTimeout(3000);

            await page.goto(
                "https://qrisajaib.com/check-account",
                {
                    waitUntil: "domcontentloaded",
                    timeout: 30000
                }
            );

            await page.locator("#bank_id").waitFor({
                state: "visible",
                timeout: 10000
            });

            console.log("Login QRIS berhasil");
            console.log("QRIS CHECK ACCOUNT READY");

            return true;

        } catch (err) {

            console.log("");
            console.log("========== LOGIN ATTEMPT ERROR ==========");
            console.log(err.message);
            console.log("=========================================");

            if (attempt < MAX_RETRY) {

                console.log("Retry login QRIS dalam 3 detik...");

                await page.waitForTimeout(3000);

            } else {

                console.log("");
                console.log("========== QRIS LOGIN FAILED ==========");
                console.log("Login gagal setelah 3 percobaan.");
                console.log("=======================================");

                throw err;

            }

        }

    }

}


async function doCheck(page, bank, rekening) {

    console.log("=================================");
    console.log("CHECK ACCOUNT");
    console.log("Bank :", bank);
    console.log("Rekening :", rekening);
    console.log("=================================");

    await page.locator("#bank_id").waitFor({
        state: "visible",
        timeout: 10000
    });

    await page.selectOption(
        "#bank_id",
        {
            label: bank
        }
    );

    await page.fill(
        "#account_no",
        rekening
    );

    await page.click(
        'button[type="submit"]'
    );

    await page.locator(".alert").waitFor({
        state: "visible",
        timeout: 10000
    });

    const html = await page
        .locator(".alert")
        .innerHTML();

    console.log("========== HTML ==========");
    console.log(html);

    const result = parseResult(html);

    console.log("========== OBJECT ==========");
    console.log(result);

    return result;

}


async function checkAccount(page, bank, rekening) {

    try {

        return await doCheck(
            page,
            bank,
            rekening
        );

    } catch (err) {

        console.log("");
        console.log("========== QRIS ERROR ==========");
        console.log(err.message);
        console.log("================================");

        console.log("QRIS kemungkinan logout / session bermasalah.");
        console.log("Mencoba login ulang...");
        console.log("");

    }


    try {

        await loginQRIS(page);

    } catch (loginError) {

        console.log("");
        console.log("========== QRIS LOGIN ERROR ==========");
        console.log(loginError);
        console.log("=======================================");

        throw loginError;

    }


    try {

        console.log("");
        console.log("Retry CHECK ACCOUNT...");

        return await doCheck(
            page,
            bank,
            rekening
        );

    } catch (retryError) {

        console.log("");
        console.log("========== QRIS RETRY ERROR ==========");
        console.log(retryError);
        console.log("======================================");

        throw retryError;

    }

}


module.exports = checkAccount;