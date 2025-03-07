import express, { Request, Response, NextFunction } from "express";
import ParkingSlotController from "../controller/ParkingSlotController";
import ParkingSlotService from "../services/ParkingSlotService";
import { parkingSlotValidation } from "../validator/parkingSlotValidation";
import { ParkingSlotPaginationRequest, ParkingSlotRequest, SearchParkingSlotRequest, StatusUpdateRequest } from "../types";

const parkingSlotRouter = express.Router();

const parkingSlotService = new ParkingSlotService();
const parkingSlotController = new ParkingSlotController(parkingSlotService);

// Create a new parking slot
parkingSlotRouter.post(
    "/create",
    parkingSlotValidation,
    (req: Request, res: Response, next: NextFunction) =>
        parkingSlotController.create(req as ParkingSlotRequest, res, next)
);

// Get all parking slots with pagination
parkingSlotRouter.get(
    "/get-all",
    (req: Request, res: Response, next: NextFunction) =>
        parkingSlotController.getAll(req as ParkingSlotPaginationRequest, res, next)
);

parkingSlotRouter.get(
    "/get-all-users-slot",
    (req: Request, res: Response, next: NextFunction) =>
        parkingSlotController.getAllUsersSlot(req as ParkingSlotPaginationRequest, res, next)
);

parkingSlotRouter.get(
    "/search-slot",
    (req: Request, res: Response, next: NextFunction) =>
        parkingSlotController.searchSlot(req as SearchParkingSlotRequest, res, next)
);

// Get parking slot by ID
parkingSlotRouter.get(
    "/get-by-id/:id",
    (req: Request, res: Response, next: NextFunction) =>
        parkingSlotController.getById(req, res, next)
);

// Update parking slot details
parkingSlotRouter.put(
    "/update/:id",
    parkingSlotValidation,
    (req: Request, res: Response, next: NextFunction) =>
        parkingSlotController.update(req as ParkingSlotRequest, res, next)
);

// Delete parking slot
parkingSlotRouter.delete(
    "/delete/:id",
    (req: Request, res: Response, next: NextFunction) =>
        parkingSlotController.delete(req, res, next)
);

// Update parking slot payment status
parkingSlotRouter.put(
    "/update-payment-status",
    (req: Request, res: Response, next: NextFunction) =>
        parkingSlotController.updatePaymentStatus(req as StatusUpdateRequest, res, next)
);

export default parkingSlotRouter;
