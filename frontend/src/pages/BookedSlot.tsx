import { useState } from "react";
import BookedSlotsCard from "../components/ui/BookedSlotCard"
import { useBookingSlotFetchQuery } from "../hook/useBookingSlot";
import { useUser } from "@clerk/clerk-react";
import { IBooking, IPagination } from "../types";

function BookedSlot() {

    // const [bookedSlots, setBookedSlots] = useState([
    //     {
    //         id: 1,
    //         userName: "John Doe",
    //         name: "Sunset Mall Parking",
    //         address: "456 Sunset Blvd, Los Angeles, CA",
    //         totalHours: 2,
    //         totalSlots: 1,
    //         status: "Active",
    //         paymentStatus: "Paid",
    //         amount: 150
    //     },
    //     {
    //         id: 2,
    //         userName: "Jane Smith",
    //         name: "City Center Parking",
    //         address: "123 Main St, New York, NY", totalHours: 3,
    //         totalSlots: 2,
    //         status: "Inactive",
    //         paymentStatus: "Pending",
    //         amount: 350

    //     },
    // ]);

    const { user } = useUser();
    const [pagination] = useState<IPagination>({
        page: 1,
        limit: 25,
        sortBy: "createdAt",
        order: "desc",
        clerkId: user!.id
    })

    const { data } = useBookingSlotFetchQuery(pagination);

    const mappedData = data?.data?.data?.bookings.map((item: IBooking, index: number) => ({
        slotId: item.id._id,
        _id: item._id,
        id: index + 1, // Assuming unique IDs should be generated sequentially
        userName: item.name, // Mapping 'name' to 'userName'
        name: item.id.name, // Mapping nested 'name'
        address: item.id.address, // Mapping nested 'address'
        totalHours: item.totalHours,
        totalSlots: item.totalSlots,
        status: item.id.status, // Mapping nested 'status'
        paymentStatus: item.paymentStatus,
        amount: item.amount,
        date: item.date
    }));

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <BookedSlotsCard bookedSlots={mappedData ? mappedData : []} />
        </div>
    )
}

export default BookedSlot