import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createParkingSlot, deleteParkingSlot, fetchParkingSlot } from "../http/api"
import { IPagination } from "../types";

export const useCreateCarSlotMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-car-slot"],
        mutationFn: createParkingSlot,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["fetch-car-slot"] })
        },
    });
}

export const useFetchCarSlotQuery = (pagination: IPagination) => {
    return useQuery({
        queryKey: ["fetch-car-slot"],
        queryFn: () => fetchParkingSlot(pagination)
    })
}


export const useDeleteCarSlotMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["delete-car-slot"],
        mutationFn: deleteParkingSlot,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["fetch-car-slot"] })
        },
    })
}