const express = require("express");
const cors = require("cors");

const app = express();

app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const rekeningRoute = require("./routes/rekening");

app.use("/api", rekeningRoute);

module.exports = app;