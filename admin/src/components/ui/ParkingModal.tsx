import { IoMdClose } from "react-icons/io";
import { ParkingSlot } from "../../types/index";

interface ParkingModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    newSlot: ParkingSlot;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    addOrUpdateSlot: () => void;
    isEditing: boolean;
}

const ParkingModal: React.FC<ParkingModalProps> = ({ isModalOpen, setIsModalOpen, newSlot, handleChange, addOrUpdateSlot, isEditing }) => {
    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{isEditing ? "Edit Parking Slot" : "Add Parking Slot"}</h2>
                    <button onClick={() => setIsModalOpen(false)}>
                        <IoMdClose className="text-xl" />
                    </button>
                </div>

                <input type="text" placeholder="Parking Area Name" name="name" value={newSlot.name} onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />
                <input type="text" placeholder="Location/Address" name="address" value={newSlot.address} onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
                <input type="text" placeholder="Pin Code" name="pinCode" value={newSlot.pinCode} onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
                <input type="number" placeholder="Total Slots" name="totalSlots" value={newSlot.totalSlots} onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
                <input type="number" placeholder="Available Slots" name="availableSlots" value={newSlot.availableSlots} onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
                <input type="text" placeholder="Hourly Rate" name="hourlyRate" value={newSlot.hourlyRate} onChange={handleChange} className="w-full mb-3 p-2 border rounded" />

                {/* <input type="text" placeholder="Payment Methods" name="paymentMethods" value={newSlot.paymentMethods} onChange={handleChange} className="w-full mb-3 p-2 border rounded" /> */}

                <select name="status" value={newSlot.status} onChange={handleChange} className="w-full mb-3 p-2 border rounded">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <button onClick={addOrUpdateSlot} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    {isEditing ? "Update Slot" : "Add Slot"}
                </button>
            </div>
        </div>
    );
};

export default ParkingModal;
