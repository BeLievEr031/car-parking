import { NextFunction, Response, Router } from "express"
import Razorpay from "razorpay";
import { HTTP_STATUS } from "../utils/constant";
import { CreateOrderRequest } from "../types";
import Config from "../config/Config";
import Booking from "../model/Booking";
const paymentRouter = Router();

const razorpay = new Razorpay({
    key_id: Config.RAZORPAY_KEY_ID!,
    key_secret: Config.RAZORPAY_KEY_SECRET!,
});

paymentRouter.post("/create-order", async (req: CreateOrderRequest, res: Response, next: NextFunction) => {
    try {

        const { id } = req.body
        if (!id) {
            res.status(HTTP_STATUS.OK).json({ message: "All fields required." })
        }

        const booking = await Booking.findOne({ _id: id })
        const options = {
            amount: booking!.amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.status(HTTP_STATUS.OK).json(order);
    } catch (error) {
        next(error)
    }
})

export default paymentRouter;