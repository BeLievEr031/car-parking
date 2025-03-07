import mongoose, { Schema } from "mongoose";
import { IBooking } from "../types";

// Define an interface for the booking model


// Define the Mongoose schema
const BookingSchema = new Schema<IBooking>({
    id: {
        type: Schema.Types.ObjectId,
        ref: "ParkingSlot",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    totalHours: {
        type: Number,
        required: true,
        min: 1, // Minimum 1 hour required
    },
    totalSlots: {
        type: Number,
        required: true,
        min: 1, // At least 1 slot required
    },
    amount: {
        type: Number,
        required: true,
        min: 0, // Amount cannot be negative
    },
    clerkId: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["Paid", "Pending"], // Only "Paid" or "Pending" allowed
        required: true,
        default: "Pending"
    },
}, {
    timestamps: true, // Automatically adds createdAt & updatedAt fields
});

// Export the model
const Booking = mongoose.model<IBooking>("Booking", BookingSchema);
export default Booking;
