import api from ".";
import { BookSlotData } from "../pages/BookSlot";
import { BookingStatusUpdate, IPagination, ParkingSlot, SearchBookingSlot } from "../types";

export const createParkingSlot = (data: ParkingSlot) => api.post("/car-parking-slot/create", data)

export const fetchParkingSlot = (pagination: IPagination) => api.get(`/car-parking-slot/get-all-users-slot?page=${pagination.page}&limit=${pagination.limit}&sortBy=${pagination.sortBy}&order=${pagination.order}&clerkId=${pagination.clerkId!}`)


export const deleteParkingSlot = (id: string) => api.delete(`/car-parking-slot/delete/${id}`)

export const searchParkingSlot = (query: SearchBookingSlot) => api.get(`/car-parking-slot/search-slot?address=${query.address}&pinCode=${query.pinCode}&date=${query.date}`)

export const createBooking = (data: BookSlotData) => api.post('/car-booking-slot/create', data)

export const fetchBookedParkingSlot = (pagination: IPagination) => api.get(`/car-booking-slot/get-all?page=${pagination.page}&limit=${pagination.limit}&sortBy=${pagination.sortBy}&order=${pagination.order}&clerkId=${pagination.clerkId!}`)

export const createPaymentOrder = (data: { id: string }) => api.post(`/payment/create-order`, data)

export const updateBookingSlotStatusMutation = (data: BookingStatusUpdate) => api.put('/car-booking-slot/update-payment-status', data)