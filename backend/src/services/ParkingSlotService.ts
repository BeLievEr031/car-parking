import mongoose from "mongoose";
import ParkingSlot from "../model/ParkingSlot";
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

    async searchSlot(address: string, pinCode: string,) {

        const [slots] = await Promise.all([
            ParkingSlot.find({
                $or: [
                    { address: { $regex: address, $options: "i" } },
                    { pinCode }
                ]
            }),
            ParkingSlot.countDocuments(),
        ]);

        return {
            slots,
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
