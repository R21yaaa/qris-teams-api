const BANK = {
    // Bank Utama
    bri: "Bank BRI",
    bca: "Bank BCA",
    bni: "Bank BNI",
    allo: "Bank Allo",
    mandiri: "Bank Mandiri",
    btn: "Bank BTN",
    bsi: "Bank BSI",
    danamon: "Bank Danamon",
    permata: "Bank Permata",
    maybank: "BANK MAYBANK INDONESIA",
    panin: "Bank Panin",
    cimb: "CIMB Niaga",
    uob: "BANK UOB INDONESIA",
    ocbc: "BANK OCBC NISP",
    citibank: "BANK CITIBANK",
    ccb: "BANK CCB INDONESIA",
    arthagraha: "Bank ARTHA GRAHA",
    mufg: "BANK OF TOKYO MITSUBISHI UFJ",
    dbs: "Bank DBS",
    standardchartered: "BANK STANDARD CHARTERED",
    capital: "BANK CAPITAL INDONESIA",
    anz: "BANK ANZ INDONESIA",
    mayapada: "BANK MAYAPADA",
    sinarmas: "BANK SINARMAS",
    maspion: "BANK MASPION",
    boc: "BANK OF CHINA HONGKONG",
    btpn: "BANK BTPN",
    neo: "BANK NEO COMMERCE",
    hsbc: "BANK HSBC INDONESIA",
    rabobank: "BANK RABOBANK",
    jtrust: "BANK JTRUST INDONESIA",
    muamalat: "BANK MUAMALAT",
    mestika: "BANK MESTIKA DHARMA",
    ganesha: "BANK GANESHA",
    icbc: "BANK ICBC INDONESIA",
    qnb: "BANK QNB INDONESIA",
    hana: "BANK HANA",
    mnc: "BANK MNC INTERNASIONAL",
    ctbc: "BANK CTBC INDONESIA",
    okbank: "BANK OK INDONESIA",
    kesejahteraan: "BANK KESEJAHTERAAN EKONOMI",
    jago: "BANK JAGO",
    jasajakarta: "BANK JASA JAKARTA",
    multiarta: "BANK MULTIARTA SENTOSA",
    briagro: "BANK BRI AGRO",
    sbi: "BANK SBI INDONESIA",
    nobu: "Bank Nobu",
    superbank: "Superbank Indonesia",
    sahabat: "BANK SAHABAT SAMPOERNA",
    krom: "PT KROM BANK INDONESIA, TBK",
    blu: "Blu BCA",
    mega: "BANK MEGA",
    megasyariah: "BANK MEGA SYARIAH",
    ina: "BANK INA PERDANA",
    mayora: "BANK MAYORA",
    index: "BANK INDEX SELINDO",
    mantap: "BANK MANTAP",
    victoria: "BANK VICTORIA INTERNATIONAL",
    ibk: "BANK IBK",
    shinhan: "BANK SHINHAN",
    commonwealth: "BANK COMMONWEALTH",
    allo: "Bank Allo",
    bumiarta: "Bank Bumi Arta",

    // BPD
    bjb: "BPD BJB",
    babel: "BPD SUMSELBABEL",
    dki: "BPD DKI",
    diy: "BPD DIY",
    jateng: "BPD JATENG",
    jatim: "BPD JATIM",
    jambi: "BPD JAMBI",
    aceh: "BPD ACEH SYARIAH",
    sumut: "BPD SUMATERA UTARA",
    sumbar: "BPD SUMBAR",
    riaukepri: "BPD RIAU KEPRI",
    sumselbabel: "BPD SUMSELBABEL",
    lampung: "BPD LAMPUNG",
    kalbar: "BPD KALBAR",
    kaltim: "BPD KALTIM KALTARA",
    kalteng: "BPD KALIMANTAN TENGAH",
    kalsel: "BPD KALIMANTAN SELATAN",
    sulselbar: "BPD SULSELBAR",
    sulutgo: "BPD SULUT GO",
    ntb: "BPD NUSA TENGGARA BARAT",
    bali: "BPD BALI",
    ntt: "BPD NUSA TENGGARA TIMUR",
    maluku: "BPD MALUKU DAN MALUKU UTARA",
    papua: "BPD PAPUA",
    sulteng: "BPD SULAWESI TENGAH",
    sultra: "BPD SULAWESI TENGGARA",
    banten: "BPD BANTEN",
    bengkulu: "BPD BENGKULU",

    // Digital Bank & E-Wallet
    seabank: "Seabank",
    dana: "DANA",
    ovo: "OVO",
    gopay: "GOPAY",
    linkaja: "LinkAja",
    shopee: "Shopeepay",

    // Lainnya
    doku: "DOKU",
    finnet: "FINNET",
    sgodpay: "SGOD PAY",
    altocash: "ALTOCASH",
    altopay: "ALTOPAY",
    xltunai: "XL TUNAI"
};

function parseCommand(text) {

    if (!text) return null;

    text = text.trim().toLowerCase();

    const match = text.match(/^([a-z0-9]+)\s+(\d+)$/);

    if (!match) return null;

    const bank = BANK[match[1]];

    if (!bank) return null;

    return {
        bank,
        rekening: match[2]
    };
}

module.exports = parseCommand;