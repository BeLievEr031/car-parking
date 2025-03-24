import mongoose from "mongoose";
import ParkingSlot from "../model/ParkingSlot";
import Booking from "../model/Booking";
import { IParkingSlot } from "../types";

class ParkingSlotService {
    // Create a new parking slot
    async createSlot(slotData: IParkingSlot): Promise<IParkingSlot> {
        return await ParkingSlot.create(slotData);
    }

    // Get all parking slots with pagination and sorting
    async getAllSlots(clerkId: string, page: number, limit: number, sortBy: string, order: string) {
        const offset = (page - 1) * limit;
        const sortOrder = order === "asc" ? 1 : -1;

        const [slots, totalSlots] = await Promise.all([
            ParkingSlot.find({ clerkId })
                .sort({ [sortBy]: sortOrder })
                .skip(offset)
                .limit(limit),
            ParkingSlot.countDocuments(),
        ]);

        return {
            slots,
            pagination: {
                totalSlots,
                currentPage: page,
                totalPages: Math.ceil(totalSlots / limit),
            },
        };
    }

    async searchSlot(address: string, pinCode: string, date: string) {
        // Convert frontend date (YYYY-MM-DDTHH:mm) to Date object
        const selectedDate = new Date(date);

        // Define start and end of the selected date
        const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0)); // 00:00:00
        const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999)); // 23:59:59

        // Aggregate totalSlots for each ParkingSlot on the selected date
        let result = await Booking.aggregate([
            {
                $match: {
                    date: {
                        $gte: startOfDay, // Include bookings from 00:00:00
                        $lt: endOfDay     // Up to 23:59:59
                    }
                }
            },
            {
                $group: {
                    _id: "$id", // Group by ParkingSlot ID
                    totalSlotsSum: { $sum: "$totalSlots" } // Sum totalSlots for each slot
                }
            },
            {
                $lookup: {
                    from: "parkingslots", // Join with ParkingSlot collection
                    localField: "_id",
                    foreignField: "_id",
                    as: "parkingSlotDetails"
                }
            },
            {
                $unwind: "$parkingSlotDetails" // Convert array result from lookup into an object
            },
            {
                $match: {
                    $or: [
                        { "parkingSlotDetails.address": { $regex: address, $options: "i" } },
                        { "parkingSlotDetails.pinCode": pinCode }
                    ]
                }
            },
            {
                $project: {
                    _id: 1,
                    parkingSlotId: "$_id",
                    totalSlotsSum: 1,
                    name: "$parkingSlotDetails.name",
                    address: "$parkingSlotDetails.address",
                    pinCode: "$parkingSlotDetails.pinCode",
                    totalSlots: "$parkingSlotDetails.totalSlots",
                    hourlyRate: "$parkingSlotDetails.hourlyRate",
                    location: "$parkingSlotDetails.location",
                    status: "$parkingSlotDetails.status",
                }
            }
        ]);

        if (result.length === 0) {
            const [slots] = await Promise.all([
                ParkingSlot.find({
                    $or: [
                        { address: { $regex: address, $options: "i" } },
                        { pinCode }
                    ]
                }),
                ParkingSlot.countDocuments(),
            ]);

            result = slots;
        }

        return {
            slots: result,
            // bookedSlots: result // Contains each parking slot's total booked slots
        };
    }




    async getAllUsersSlot(clerkId: string, page: number, limit: number, sortBy: string, order: string) {
        const offset = (page - 1) * limit;
        const sortOrder = order === "asc" ? 1 : -1;

        const [slots, totalSlots] = await Promise.all([
            ParkingSlot.find()
                .sort({ [sortBy]: sortOrder })
                .skip(offset)
                .limit(limit),
            ParkingSlot.countDocuments(),
        ]);

        return {
            slots,
            pagination: {
                totalSlots,
                currentPage: page,
                totalPages: Math.ceil(totalSlots / limit),
            },
        };
    }

    // Get a parking slot by ID
    async getSlotById(slotId: string): Promise<IParkingSlot | null> {
        return await ParkingSlot.findById(slotId);
    }

    // Update a parking slot
    async updateSlot(slotId: string, updateData: Partial<IParkingSlot>): Promise<IParkingSlot | null> {
        return await ParkingSlot.findByIdAndUpdate(slotId, updateData, { new: true });
    }

    // Update payment status
    async updatePaymentStatus(id: mongoose.Schema.Types.ObjectId, paymentStatus: string) {
        return await ParkingSlot.findOneAndUpdate(
            { _id: id },
            { $set: { paymentStatus } },
            { new: true }
        );
    }

    // Delete a parking slot
    async deleteSlot(slotId: string): Promise<IParkingSlot | null> {
        return await ParkingSlot.findByIdAndDelete(slotId);
    }
}

export default ParkingSlotService;
