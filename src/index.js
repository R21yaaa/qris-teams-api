require("dotenv").config();

const app = require("./app");
const qrisService = require("./services/qrisService");

const PORT = process.env.PORT || 3001;

(async () => {

    try {

        await qrisService.start();

        app.listen(PORT, () => {

            console.log("========================");
            console.log("API READY");
            console.log("http://localhost:" + PORT);
            console.log("========================");

        });

    } catch (err) {

        console.error(err);

    }

})();