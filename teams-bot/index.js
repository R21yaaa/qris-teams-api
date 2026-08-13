require("dotenv").config();

const { startBrowser } = require("./src/teams/browser");
const { getNewMessage } = require("./src/teams/readMessage");
const { sendMessage } = require("./src/teams/sendMessage");

const { startQRIS } = require("./src/qris/Browser");
const checkAccount = require("./src/qris/checkAccount");

const parseCommand = require("./src/parser");
const formatResult = require("./src/formatter");

(async () => {

    const teamsPage = await startBrowser();
    const qrisPage = await startQRIS();

    console.log("=================================");
    console.log("BOT READY");
    console.log("=================================");

    let lastMessage = null;

    while (true) {

        try {

            const msg = await getNewMessage(teamsPage);

            if (!msg || msg === lastMessage) {

                await new Promise(r => setTimeout(r, 300));
                continue;

            }

            lastMessage = msg;

            console.log("");
            console.log("=================================");
            console.log("CHAT BARU");
            console.log("=================================");
            console.log(msg);

            const cmd = parseCommand(msg);

            if (!cmd) {

                console.log("Bukan command.");

                await new Promise(r => setTimeout(r, 300));
                continue;

            }

            console.log("COMMAND:");
            console.log(cmd);

            const result = await checkAccount(

                qrisPage,
                cmd.bank,
                cmd.rekening

            );

            console.log("HASIL:");
            console.log(result);

            // Parser benar-benar gagal
            if (result === null) {

                console.log("Parser gagal membaca hasil QRIS.");

                await sendMessage(
                    teamsPage,
                    "⚠️ Terjadi kesalahan saat membaca hasil.\nSilakan coba lagi."
                );

                continue;

            }

            const reply = formatResult(result, cmd);

            console.log("========== REPLY ==========");
            console.log(reply);

            console.log("Kirim ke Teams...");

            await sendMessage(
                teamsPage,
                reply
            );

            console.log("Berhasil kirim.");

        }

        catch (err) {

            console.log("");
            console.log("========== ERROR ==========");
            console.log(err);

        }

        await new Promise(r => setTimeout(r, 300));

    }

})();