const parseQRIS = require("../parsers/qrisParser");
console.log("===== CHECKACCOUNT V4 =====");

async function checkAccount(page, bankId, bankName, rekening) {

    console.time("TOTAL");

    console.log("=================================");
    console.log("CHECK ACCOUNT");
    console.log("Bank      :", bankName);
    console.log("UUID      :", bankId);
    console.log("Rekening  :", rekening);
    console.log("=================================");

    await page.locator("#bank_id").waitFor();
    console.log("URL:", page.url());

await page.screenshot({
  path: "error.png",
  fullPage: true
});

require("fs").writeFileSync(
  "error.html",
  await page.content()
);

    await page.locator("#bank_id").selectOption(bankId);
    const selected = await page.locator("#bank_id").inputValue();

console.log("Selected Option:", selected);
console.log("Expected UUID :", bankId);

    const input = page.locator("#account_no");

    await input.evaluate((el, value) => {
        el.value = value;
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
    }, rekening);

    console.log("INPUT :", await input.inputValue());

    await page.locator('button[type="submit"]').click({
        force: true
    });

    const alert = page.locator(".alert");

    await alert.waitFor({
        state: "visible",
        timeout: 5000
    });

    // ===============================
    // Ambil HTML, bukan textContent
    // ===============================

    const html = await alert.innerHTML();

    console.log("========== HTML ==========");
    console.log(html);
    console.log("==========================");

    function getBetween(text, start, end = null) {

        const s = text.indexOf(start);

        if (s === -1) return "";

        const from = s + start.length;

        if (!end) {
            return text.substring(from).trim();
        }

        const e = text.indexOf(end, from);

        if (e === -1) {
            return text.substring(from).trim();
        }

        return text.substring(from, e).trim();

    }

    console.timeEnd("TOTAL");

const parsed = parseQRIS(
    html,
    bankName,
    rekening
);

console.log("PARSED RESULT =>", parsed);

return parsed;

}

module.exports = checkAccount;