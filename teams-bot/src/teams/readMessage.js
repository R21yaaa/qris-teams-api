let lastMessageId = null;

async function getNewMessage(page) {

    return await page.evaluate((lastId) => {

        // Ambil semua bubble chat
        const messages = [...document.querySelectorAll("[data-message-content]")];

        for (let i = messages.length - 1; i >= 0; i--) {

            const msg = messages[i];

            const text = (msg.getAttribute("aria-label") || "").trim();

            if (!text)
                continue;

            // Abaikan attachment
            const lower = text.toLowerCase();

            if (
                lower === "image" ||
                lower === "gif" ||
                lower === "video" ||
                lower === "attachment"
            ) {
                continue;
            }

            // Abaikan hasil bot
            if (
                text.includes("ACCOUNT VERIFIED") ||
                text.includes("Powered by R21 BOT")
            ) {
                continue;
            }

            // id unik element
            const id =
                msg.getAttribute("id") ||
                msg.dataset.messageId ||
                i.toString();

            if (id === lastId)
                return null;

            return {
                id,
                text
            };

        }

        return null;

    }, lastMessageId).then(result => {

        if (!result)
            return null;

        lastMessageId = result.id;

        return result.text;

    });

}

module.exports = {
    getNewMessage
};