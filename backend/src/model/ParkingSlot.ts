import mongoose, { Schema } from "mongoose";
import { IParkingSlot } from "../types";

const ParkingSlotSchema = new Schema<IParkingSlot>({
    clerkId: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    pinCode: { type: String, required: true },
    totalSlots: { type: Number, required: true },
    availableSlots: { type: Number, required: true },
    hourlyRate: { type: Number, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },

    // ✅ Storing lat/lng as GeoJSON format
    location: {
        type: {
            type: String,
            enum: ["Point"],  // GeoJSON type
            default: "Point",
            required: true,
        },
        coordinates: {
            type: [Number],  // Array: [longitude, latitude]
            required: true,
            validate: {
                validator: function (coords: number[]) {
                    return (
                        coords.length === 2 &&
                        coords[0] >= -180 && coords[0] <= 180 &&  // Longitude range
                        coords[1] >= -90 && coords[1] <= 90       // Latitude range
                    );
                },
                message: "Invalid latitude or longitude values.",
            },
        },
    },
});

// ✅ Create a 2dsphere index for geospatial queries
ParkingSlotSchema.index({ location: "2dsphere" });

export default mongoose.model<IParkingSlot>("ParkingSlot", ParkingSlotSchema);
