import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";
import parkingSlotRouter from "./routes/parkingSlotRoutes";
import bookingRouter from "./routes/bookingRouter";
import axios from "axios";
import paymentRouter from "./routes/payment";

const app = express();

app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3030"]
}))

app.use(express.json({ limit: "1MB" }))
app.use(express.urlencoded({ extended: true, limit: "1MB" }))
app.use(cookieParser())

app.use("/car-parking-slot", parkingSlotRouter)
app.use("/car-booking-slot", bookingRouter)
app.use("/payment", paymentRouter)

app.use("/fetch-users", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await axios.get("https://api.clerk.dev/v1/users", {
            headers: {
                Authorization: `Bearer sk_test_t2bQ4DRSls4NlPDFm2ngcaDctfu4kqOwh7AkiSTsgo`,
                "Content-Type": "application/json",
            },
        });
        res.json(response.data);
    } catch (error) {
        next(error)
    }
})
app.use(errorHandler)

export default app;