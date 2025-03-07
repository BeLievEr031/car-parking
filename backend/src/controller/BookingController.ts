import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import BookingService from "../services/BookingService";
import { HTTP_STATUS } from "../utils/constant";
import { BookingRequest, BookingPaginationRequest, StatusUpdateRequest, SearchBookingRequest } from "../types";
import ParkingSlot from "../model/ParkingSlot";
import logger from "../config/logger";

class BookingController {
    constructor(private bookingService: BookingService) {
        this.bookingService = bookingService;
    }

    // Create a new booking
    async create(req: BookingRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const { id, totalSlots } = req.body;
            const slot = await ParkingSlot.findById(id);

            if (!slot) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: "Slot not found" })
                return;
            }

            if (slot.availableSlots < totalSlots) {
                res.status(HTTP_STATUS.CONFLICT).json({ success: false, message: "Not have enough slots." })
                return;
            }

            const bookingData = { ...req.body }
            logger.info(bookingData);


            const booking = await this.bookingService.createBooking(req.body);

            slot.availableSlots -= Number(totalSlots);
            await slot.save();
            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                data: booking,
                message: "Booking created successfully.",
            });

        } catch (error) {
            next(error);
        }
    }

    // Get all bookings with pagination and sorting
    async getAll(req: BookingPaginationRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const clerkId = req.query.clerkId;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const sortBy = (req.query.sortBy as string) || "createdAt";
            const order = (req.query.order as string) || "desc";

            const result = await this.bookingService.getAllBookings(clerkId, page, limit, sortBy, order);
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "Bookings fetched successfully.",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    // Search bookings by name or date
    async searchBooking(req: SearchBookingRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const name = req.query.name;
            const date = req.query.date;

            const result = await this.bookingService.searchBooking(name, date);
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "Bookings fetched successfully.",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    // Get all user bookings (admin view)
    async getAllUsersBookings(req: BookingPaginationRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const sortBy = (req.query.sortBy as string) || "createdAt";
            const order = (req.query.order as string) || "desc";

            const result = await this.bookingService.getAllUsersBookings(page, limit, sortBy, order);
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "All user bookings fetched successfully.",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    // Get booking by ID
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const bookingId = req.params.id;
            const booking = await this.bookingService.getBookingById(bookingId);
            if (!booking) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Booking not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, data: booking });
        } catch (error) {
            next(error);
        }
    }

    // Update booking details
    async update(req: BookingRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const bookingId = req.params.id;
            const updatedBooking = await this.bookingService.updateBooking(bookingId, req.body);
            if (!updatedBooking) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Booking not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({
                success: true,
                data: updatedBooking,
                message: "Booking updated successfully.",
            });
        } catch (error) {
            next(error);
        }
    }

    // Delete a booking
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const bookingId = req.params.id;
            const deleted = await this.bookingService.deleteBooking(bookingId);
            if (!deleted) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Booking not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, message: "Booking deleted successfully." });
        } catch (error) {
            next(error);
        }
    }

    // Update booking payment status
    async updatePaymentStatus(req: StatusUpdateRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const { _id, paymentStatus } = req.body;
            const updatedBooking = await this.bookingService.updatePaymentStatus(_id, paymentStatus);

            const slot = await ParkingSlot.findById({ _id: updatedBooking?.id })

            slot!.totalSlots += updatedBooking!.totalSlots

            await slot?.save();

            if (!updatedBooking) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Booking not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({
                success: true,
                data: updatedBooking,
                message: "Booking payment status updated successfully.",
            });
        } catch (error) {
            next(error);
        }
    }
}

export default BookingController;
