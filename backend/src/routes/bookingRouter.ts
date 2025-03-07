import express, { Request, Response, NextFunction } from "express";
import BookingController from "../controller/BookingController";
import BookingService from "../services/BookingService";
import { bookingValidation } from "../validator/bookingValidation";
import { BookingPaginationRequest, BookingRequest, SearchBookingRequest, StatusUpdateRequest } from "../types";

const bookingRouter = express.Router();

const bookingService = new BookingService();
const bookingController = new BookingController(bookingService);

// Create a new booking
bookingRouter.post(
    "/create",
    bookingValidation,
    (req: Request, res: Response, next: NextFunction) =>
        bookingController.create(req as BookingRequest, res, next)
);

// Get all bookings with pagination
bookingRouter.get(
    "/get-all",
    (req: Request, res: Response, next: NextFunction) =>
        bookingController.getAll(req as BookingPaginationRequest, res, next)
);

// Get all users' bookings (admin view)
bookingRouter.get(
    "/get-all-users-bookings",
    (req: Request, res: Response, next: NextFunction) =>
        bookingController.getAllUsersBookings(req as BookingPaginationRequest, res, next)
);

// Search bookings
bookingRouter.get(
    "/search-booking",
    (req: Request, res: Response, next: NextFunction) =>
        bookingController.searchBooking(req as SearchBookingRequest, res, next)
);

// Get booking by ID
bookingRouter.get(
    "/get-by-id/:id",
    (req: Request, res: Response, next: NextFunction) =>
        bookingController.getById(req, res, next)
);

// Update booking details
bookingRouter.put(
    "/update/:id",
    bookingValidation,
    (req: Request, res: Response, next: NextFunction) =>
        bookingController.update(req as BookingRequest, res, next)
);

// Delete booking
bookingRouter.delete(
    "/delete/:id",
    (req: Request, res: Response, next: NextFunction) =>
        bookingController.delete(req, res, next)
);

// Update booking payment status
bookingRouter.put(
    "/update-payment-status",
    (req: Request, res: Response, next: NextFunction) =>
        bookingController.updatePaymentStatus(req as StatusUpdateRequest, res, next)
);

export default bookingRouter;
