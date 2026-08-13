async function sendMessage(page, text) {

    const selector = '[data-tid="ckeditor"]';

    await page.waitForSelector(selector, {
        visible: true,
        timeout: 10000
    });

    // Pastikan editor benar-benar mendapat fokus
    await page.click(selector);

    // Buat koneksi CDP
    const client = await page.createCDPSession();

    // Masukkan seluruh teks sekaligus
    await client.send("Input.insertText", {
        text: text
    });

    await new Promise(r => setTimeout(r, 200));

    // Cek isi editor
    const isi = await page.$eval(
        selector,
        el => el.innerText || el.textContent || ""
    );

    console.log("ISI EDITOR:");
    console.log(JSON.stringify(isi));

    if (!isi.trim()) {
        throw new Error(
            "Teks tidak masuk ke editor Teams."
        );
    }

    // Kirim
    await page.keyboard.press("Enter");

    console.log("Berhasil kirim.");

}

module.exports = {
    sendMessage
};