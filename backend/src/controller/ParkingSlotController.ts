import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ParkingSlotService from "../services/ParkingSlotService";
import { HTTP_STATUS } from "../utils/constant";
import { ParkingSlotRequest, ParkingSlotPaginationRequest, StatusUpdateRequest, SearchParkingSlotRequest } from "../types";

class ParkingSlotController {
    constructor(private parkingSlotService: ParkingSlotService) {
        this.parkingSlotService = parkingSlotService;
    }

    // Create a new parking slot
    async create(req: ParkingSlotRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const slot = await this.parkingSlotService.createSlot(req.body);

            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                data: slot,
                message: "Parking slot created successfully.",
            });
        } catch (error) {
            next(error);
        }
    }

    // Get all parking slots with pagination and sorting
    async getAll(req: ParkingSlotPaginationRequest, res: Response, next: NextFunction) {
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

            const result = await this.parkingSlotService.getAllSlots(clerkId, page, limit, sortBy, order);
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "Parking slots fetched successfully.",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllUsersSlot(req: ParkingSlotPaginationRequest, res: Response, next: NextFunction) {
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

            const result = await this.parkingSlotService.getAllUsersSlot(clerkId, page, limit, sortBy, order);
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "Parking slots fetched successfully.",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async searchSlot(req: SearchParkingSlotRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const address = req.query.address;
            const pinCode = req.query.pinCode

            const result = await this.parkingSlotService.searchSlot(address, pinCode);
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "Parking slots fetched successfully.",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    // Get parking slot by ID
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const slotId = req.params.id;
            const slot = await this.parkingSlotService.getSlotById(slotId);
            if (!slot) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Parking slot not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, data: slot });
        } catch (error) {
            next(error);
        }
    }

    // Update parking slot details
    async update(req: ParkingSlotRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const slotId = req.params.id;
            const updatedSlot = await this.parkingSlotService.updateSlot(slotId, req.body);
            if (!updatedSlot) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Parking slot not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({
                success: true,
                data: updatedSlot,
                message: "Parking slot updated successfully.",
            });
        } catch (error) {
            next(error);
        }
    }

    // Delete a parking slot
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const slotId = req.params.id;
            const deleted = await this.parkingSlotService.deleteSlot(slotId);
            if (!deleted) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Parking slot not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, message: "Parking slot deleted successfully." });
        } catch (error) {
            next(error);
        }
    }

    // Update parking slot payment status
    async updatePaymentStatus(req: StatusUpdateRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const { _id, paymentStatus } = req.body;
            const updatedSlot = await this.parkingSlotService.updatePaymentStatus(_id, paymentStatus);

            if (!updatedSlot) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Parking slot not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({
                success: true,
                data: updatedSlot,
                message: "Parking slot payment status updated successfully.",
            });
        } catch (error) {
            next(error);
        }
    }
}

export default ParkingSlotController;
