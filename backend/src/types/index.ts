import mongoose, { Document } from "mongoose";
import { Request } from "express"

export interface IParkingSlot extends Document {
    clerkId: string;
    name: string;
    address: string;
    pinCode: string;
    totalSlots: number;
    availableSlots: number;
    hourlyRate: number;
    status: "Active" | "Inactive";
    location: {
        type: "Point";
        coordinates: [number, number];
    };
}

export interface ParkingSlotRequest extends Request {
    body: IParkingSlot
}

export interface StatusUpdateRequest extends Request {
    body: {
        _id: mongoose.Schema.Types.ObjectId;
        paymentStatus: "Paid" | "Pending";
    }
}

export interface ParkingSlotPaginationRequest extends Request {
    query: {
        page: string;
        limit: string;
        sortBy: string;
        order: "asc" | "desc";
        clerkId: string;
    }
}

export interface SearchParkingSlotRequest extends Request {
    query: {
        address: string;
        pinCode: string;
        date: string;
    }
}

export interface IBooking extends Document {
    id: mongoose.Types.ObjectId; // Reference to another model (e.g., ParkingSlot)
    date: Date;
    name: string;
    totalHours: number;
    totalSlots: number;
    amount: number;
    clerkId: string;
    paymentStatus: "Paid" | "Pending";
}


export interface BookingRequest extends Request {
    body: IBooking;
}

export interface BookingPaginationRequest extends Request {
    query: {
        page: string;
        limit: string;
        sortBy: string;
        order: "asc" | "desc";
        clerkId: string;
    }
}

export interface SearchBookingRequest extends Request {
    query: {
        name: string;
        date: string;
    }
}

export interface CreateOrderRequest {
    body: {
        id: mongoose.Schema.Types.ObjectId;
    }
}