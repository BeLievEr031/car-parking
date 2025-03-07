import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createBooking, fetchBookedParkingSlot, updateBookingSlotStatusMutation } from "../http/api"
import { IPagination } from "../types";

export const useBookingSlotMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-booking"],
        mutationFn: createBooking,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch-car-slot"] })
        }
    })
}


export const useBookingSlotFetchQuery = (pagination: IPagination) => {
    return useQuery({
        queryKey: ["fetch-booking"],
        queryFn: () => fetchBookedParkingSlot(pagination)
    })
}


export const useUpdateBookingRideStatusMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["update-booking-status"],
        mutationFn: updateBookingSlotStatusMutation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch-booking", "fetch-car-slot"] })
        }
    })
}