import app from "./app";
import Config from "./config/Config";
import logger from "./config/logger";
import dbConnect from "./db/dbConnect";

dbConnect().then(() => {
    app.listen(Config.PORT!, () => {
        logger.info(`Connected to server at PORT ${Config.PORT!}`)
    })
}).catch((err) => {
    logger.error(err)
    process.exit(1)
})