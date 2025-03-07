import api from ".";
import { IPagination, ParkingSlot } from "../types";

export const createParkingSlot = (data: ParkingSlot) => api.post("/car-parking-slot/create", data)

export const fetchParkingSlot = (pagination: IPagination) => api.get(`/car-parking-slot/get-all?page=${pagination.page}&limit=${pagination.limit}&sortBy=${pagination.sortBy}&order=${pagination.order}&clerkId=${pagination.clerkId!}`)


export const deleteParkingSlot = (id: string) => api.delete(`/car-parking-slot/delete/${id}`)

export const fetchAllUserBoking = (pagination: IPagination) => api.get(`/car-booking-slot/get-all-users-bookings?page=${pagination.page}&limit=${pagination.limit}&sortBy=${pagination.sortBy}&order=${pagination.order}&clerkId=${pagination.clerkId!}`)