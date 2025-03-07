import mongoose from "mongoose";
import Config from "../config/Config";
import logger from "../config/logger";

const dbConnect = async () => {
    try {
        mongoose.connection.on("error", (err) => {
            logger.error("Mongodb connection error: ", err);
        })

        mongoose.connection.on("connected", () => {
            logger.info("Mongodb connected successfully.");
        })

        mongoose.connection.on("disconnected", () => {
            logger.info("Mongodb disconnected successfully.")

        })
        await mongoose.connect(Config.DB_URI!)

    } catch (error) {
        logger.error(error)
    }
}

export default dbConnect;