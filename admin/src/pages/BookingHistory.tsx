import { useState } from "react";
import BookingTable from "../components/ui/BookingTable";
import { Booking, BookingHistory, IPagination } from "../types/index";
import { useBookingFetchSlot } from "../hook/useBookingSlot";
import { useUser } from "@clerk/clerk-react";

const BookingHistoryPage: React.FC = () => {
    // Sample Booking Data (Replace with API data)
    const [bookingHistory] = useState<BookingHistory[]>([
        {
            parkingSlot: "Downtown Plaza Parking",
            user: "John Doe",
            bookingTime: "2024-03-02T14:00:00Z",
            duration: 2,
            totalPrice: 10,
            paymentStatus: "Paid",
            status: "Confirmed",
        },
        {
            parkingSlot: "Sunset Mall Parking",
            user: "Jane Smith",
            bookingTime: "2024-03-01T10:30:00Z",
            duration: 3,
            totalPrice: 21,
            paymentStatus: "Unpaid",
            status: "Pending",
        },
    ]);

    // Handle View Booking Details
    const handleViewDetails = (index: number) => {
        const booking = bookingHistory[index];
        alert(`Viewing details for ${booking.user} at ${booking.parkingSlot}`);
    };

    const { user } = useUser();
    const [pagination] = useState<IPagination>({
        clerkId: user!.id,
        limit: 25,
        order: "desc",
        page: 1,
        sortBy: "createdAt"
    });
    const { data } = useBookingFetchSlot(pagination);

    console.log(data?.data?.data?.bookings);

    const mappedBookings = data?.data?.data?.bookings.map((booking: Booking) => ({
        parkingSlot: booking.id.name,
        user: booking.name,
        bookingTime: booking.date,
        duration: booking.totalHours,
        totalPrice: booking.amount,
        paymentStatus: booking.paymentStatus === "Pending" ? "Unpaid" : "Paid",
        status: booking.paymentStatus === "Pending" ? "Pending" : "Confirmed",
    }));

    console.log(mappedBookings);


    return (
        <div className="p-6 bg-gray-100 min-h-screen w-full">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">Booking History</h1>
            <BookingTable bookingHistory={mappedBookings ? mappedBookings : []} handleViewDetails={handleViewDetails} />
        </div>
    );
};

export default BookingHistoryPage;
