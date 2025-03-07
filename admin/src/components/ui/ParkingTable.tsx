import { FaTrash } from "react-icons/fa";
import { ParkingSlot } from "../../types/index";

interface ParkingTableProps {
    parkingSlots: ParkingSlot[] | [];
    handleEdit: (index: number) => void;
    handleDelete: (id: string) => void;
}

const ParkingTable: React.FC<ParkingTableProps> = ({ parkingSlots = [], handleDelete }) => {

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Address</th>
                        <th className="p-3 text-left">Total Slots</th>
                        <th className="p-3 text-left">Available Slots</th>
                        <th className="p-3 text-left">Hourly Rate</th>
                        {/* <th className="p-3 text-left">Payment Methods</th> */}
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parkingSlots.map((slot, index) => (
                        <tr key={index} className="border-t">
                            <td className="p-3">{slot.name}</td>
                            <td className="p-3">{slot.address}</td>
                            <td className="p-3">{slot.totalSlots}</td>
                            <td className="p-3">{slot.availableSlots}</td>
                            <td className="p-3">{slot.hourlyRate}</td>
                            {/* <td className="p-3">{slot.paymentMethods}</td> */}
                            <td className={`p-3 font-semibold ${slot.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                                {slot.status}
                            </td>
                            <td className="p-3 flex gap-2">
                                {/* <button onClick={() => handleEdit(index)} className="text-blue-600 hover:text-blue-800">
                                    <FaEdit />
                                </button> */}
                                <button onClick={() => handleDelete(slot._id!)} className="text-red-600 hover:text-red-800"

                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ParkingTable;
