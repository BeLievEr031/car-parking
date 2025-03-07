import mongoose from "mongoose";
import Booking from "../model/Booking";
import { IBooking } from "../types";

class BookingService {
    // Create a new booking
    async createBooking(bookingData: IBooking): Promise<IBooking> {
        return await Booking.create(bookingData);
    }

    // Get all bookings with pagination and sorting
    async getAllBookings(clerkId: string, page: number, limit: number, sortBy: string, order: string) {
        const offset = (page - 1) * limit;
        const sortOrder = order === "asc" ? 1 : -1;

        const [bookings, totalBookings] = await Promise.all([
            Booking.find({ clerkId })
                .sort({ [sortBy]: sortOrder })
                .skip(offset)
                .limit(limit)
                .populate("id"),
            Booking.countDocuments({ clerkId }),
        ]);

        return {
            bookings,
            pagination: {
                totalBookings,
                currentPage: page,
                totalPages: Math.ceil(totalBookings / limit),
            },
        };
    }

    // Search bookings by name or date
    async searchBooking(name: string, date: string) {
        const bookings = await Booking.find({
            $or: [
                { name: { $regex: name, $options: "i" } },
                { date },
            ],
        });

        return { bookings };
    }

    // Get all users' bookings (for admins)
    async getAllUsersBookings(page: number, limit: number, sortBy: string, order: string) {
        const offset = (page - 1) * limit;
        const sortOrder = order === "asc" ? 1 : -1;

        const [bookings, totalBookings] = await Promise.all([
            Booking.find()
                .sort({ [sortBy]: sortOrder })
                .skip(offset)
                .limit(limit)
                .populate("id")
            ,
            Booking.countDocuments(),
        ]);

        return {
            bookings,
            pagination: {
                totalBookings,
                currentPage: page,
                totalPages: Math.ceil(totalBookings / limit),
            },
        };
    }

    // Get a booking by ID
    async getBookingById(bookingId: string): Promise<IBooking | null> {
        return await Booking.findById(bookingId);
    }

    // Update a booking
    async updateBooking(bookingId: string, updateData: Partial<IBooking>): Promise<IBooking | null> {
        return await Booking.findByIdAndUpdate(bookingId, updateData, { new: true });
    }

    // Update payment status
    async updatePaymentStatus(id: mongoose.Schema.Types.ObjectId, paymentStatus: "Paid" | "Pending") {
        return await Booking.findByIdAndUpdate(id, { $set: { paymentStatus } }, { new: true });
    }

    // Delete a booking
    async deleteBooking(bookingId: string): Promise<IBooking | null> {
        return await Booking.findByIdAndDelete(bookingId);
    }
}

export default BookingService;
