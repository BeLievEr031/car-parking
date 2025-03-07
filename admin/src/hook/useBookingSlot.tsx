import { useQuery } from "@tanstack/react-query"
import { IPagination } from "../types"
import { fetchAllUserBoking } from "../http/api"

export const useBookingFetchSlot = (pagination: IPagination) => {
    return useQuery({
        queryKey: ["fetch-all-users-booking"],
        queryFn: () => fetchAllUserBoking(pagination)
    })
}

