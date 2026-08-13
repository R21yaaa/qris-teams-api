function parseResult(html) {

    // =========================
    // ACCOUNT TIDAK ADA
    // =========================

    if (html.includes("Account not exists")) {

        return {

            status: false,
            bank: null,
            nama: null,
            rekening: null

        };

    }

    // =========================
    // ACCOUNT ADA
    // =========================

    if (html.includes("Account exists")) {

        return {

            bank:
                html.match(/Bank Name:(.*?)<br>/)?.[1]?.trim(),

            nama:
                html.match(/Account Name:(.*?)<br>/)?.[1]?.trim(),

            rekening:
                html.match(/Account No:(.*?)<\/div>/)?.[1]?.trim(),

            status: true

        };

    }

    return null;

}

module.exports = parseResult;