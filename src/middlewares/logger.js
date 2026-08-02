const fs = require("fs");

function saveJson(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function readJson(path) {
    if (!fs.existsSync(path)) return null;

    return JSON.parse(fs.readFileSync(path));
}

module.exports = {
    saveJson,
    readJson
};