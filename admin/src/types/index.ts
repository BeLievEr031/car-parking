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


interface Location {
    type: string;
    coordinates: [number, number];
}


interface Location {
    type: string;
    coordinates: [number, number];
}

export interface HistParkingSlot {
    _id: string;
    clerkId: string;
    name: string;
    address: string;
    pinCode: string;
    totalSlots: number;
    availableSlots: number;
    hourlyRate: number;
    status: string;
    __v: number;
    location: Location;
}

export interface Booking {
    _id: string;
    id: ParkingSlot;
    date: string;
    name: string;
    totalHours: number;
    totalSlots: number;
    amount: number;
    clerkId: string;
    paymentStatus: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface UserHistory {
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    status: string;
}

export interface ResponseUserHistory {
    first_name: string;
    last_name: string;
    email_addresses: [{
        email_address: string
    }],
    created_at: string;
    status: string;
    banned: boolean;
    locked: boolean;
}

