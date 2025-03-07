export interface ParkingSlot {
    _id?: string;
    clerkId: string;
    name: string;
    address: string;
    pinCode: string;
    totalSlots: string;
    availableSlots: string;
    hourlyRate: string;
    status: "Active" | "Inactive";
    location?: {
        type: "Point";
        coordinates: [number, number];
    };
}


export interface BookingHistory {
    parkingSlot: string;
    user: string;
    bookingTime: string;
    duration: number;
    totalPrice: number;
    paymentStatus: "Paid" | "Unpaid";
    status: "Confirmed" | "Pending";
}

export interface IPagination {
    page: number;
    limit: number;
    sortBy: string;
    order: "asc" | "desc";
    clerkId: string;
}

export interface SearchBookingSlot {
    address: string;
    pinCode: string;
}

export interface ILocation {
    type: "Point";
    coordinates: [number, number];
}

export interface IParkingSlotDetails {
    _id: string;
    clerkId: string;
    name: string;
    address: string;
    pinCode: string;
    totalSlots: number;
    availableSlots: number;
    hourlyRate: number;
    status: "Active" | "Inactive";
    location: ILocation;
    __v: number;
}

export interface IBooking {
    _id: string;
    id: IParkingSlotDetails;
    date: string; // ISO date string
    name: string; // User's name
    totalHours: number;
    totalSlots: number;
    amount: number;
    clerkId: string;
    paymentStatus: "Pending" | "Completed";
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
}

export interface BookingStatusUpdate {
    _id: string;
    paymentStatus: string;
}