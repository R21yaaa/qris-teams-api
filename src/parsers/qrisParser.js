function clean(str = "") {
  return str
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getValue(html, label) {
  const regex = new RegExp(
    label + "\\s*:?\\s*(.*?)\\s*(<br>|</div>|$)",
    "i"
  );

  const match = html.match(regex);

  if (!match) return "";

  return clean(match[1]);
}

function parseQRIS(html, defaultBank, rekening) {
  const lower = html.toLowerCase();

  // ==========================
  // ACCOUNT TIDAK DITEMUKAN
  // ==========================

  if (
    lower.includes("account not exists") ||
    lower.includes("account not found") ||
    lower.includes("attempt to read property") ||
    lower.includes("bank_code") ||
    lower.includes("on null")
  ) {
    return {
      status: false,
      bank: defaultBank,
      nama: "",
      rekening,
      message: "Account not exists",
    };
  }

  // ==========================
  // ACCOUNT DITEMUKAN
  // ==========================

  if (lower.includes("account exists")) {
    const bank =
      getValue(html, "Bank Name") || defaultBank;

    const nama =
      getValue(html, "Account Name");

    const norek =
      getValue(html, "Account No") || rekening;

    if (!nama) {
      return {
        status: false,
        bank,
        nama: "",
        rekening: norek,
        message: "Account name not found",
      };
    }

    return {
      status: true,
      bank,
      nama,
      rekening: norek,
      message: "Account exists",
    };
  }

  // ==========================
  // UNKNOWN RESPONSE
  // ==========================

  return {
    status: false,
    bank: defaultBank,
    nama: "",
    rekening,
    message: "Unknown response",
  };
}

module.exports = parseQRIS;