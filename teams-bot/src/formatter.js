function formatResult(result, cmd) {

    if (!result.status) {

        return `❌ ACCOUNT NOT FOUND

Bank      : ${cmd.bank}
Account   : ${cmd.rekening}

────────────────────────
Powered by R21🤖`;

    }

    return `✅ ACCOUNT VERIFIED

Name      : ${result.nama}
Bank      : ${result.bank}
Account   : ${result.rekening}

────────────────────────
Powered by R21🤖`;

}

module.exports = formatResult;