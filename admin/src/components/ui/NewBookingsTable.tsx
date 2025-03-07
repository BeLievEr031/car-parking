import { BookingHistory } from "../../types/index";
import { FaCheck } from "react-icons/fa";

interface BookingTableProps {
    bookingHistory: BookingHistory[];
    handleMarkPayment: (index: number) => void;
}

const NewBookingTable: React.FC<BookingTableProps> = ({ bookingHistory, handleMarkPayment }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-3 text-left">Parking Slot</th>
                        <th className="p-3 text-left">Booked By</th>
                        <th className="p-3 text-left">Booking Time</th>
                        <th className="p-3 text-left">Duration</th>
                        <th className="p-3 text-left">Total Price</th>
                        <th className="p-3 text-left">Payment Status</th>
                        <th className="p-3 text-left">Booking Status</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookingHistory.map((booking, index) => (
                        <tr key={index} className="border-t">
                            <td className="p-3">{booking.parkingSlot}</td>
                            <td className="p-3">{booking.user}</td>
                            <td className="p-3">{new Date(booking.bookingTime).toLocaleString()}</td>
                            <td className="p-3">{booking.duration} hrs</td>
                            <td className="p-3">${booking.totalPrice}</td>
                            <td className={`p-3 font-semibold ${booking.paymentStatus === "Paid" ? "text-green-600" : "text-red-600"}`}>
                                {booking.paymentStatus}
                            </td>
                            <td className={`p-3 font-semibold ${booking.status === "Confirmed" ? "text-green-600" : "text-yellow-600"}`}>
                                {booking.status}
                            </td>
                            <td className="p-3">
                                {booking.paymentStatus !== "Paid" && (
                                    <button
                                        onClick={() => handleMarkPayment(index)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                                    >
                                        <FaCheck /> Mark as Paid
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NewBookingTable;
