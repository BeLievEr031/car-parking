import { useState, ChangeEvent, FormEvent } from "react";
import Button from "../Button";
import toast from "react-hot-toast";
import { BookSlotData } from "../../pages/BookSlot";

interface BookingFormProps {
    bookSlotData: BookSlotData
    onSubmit: (formData: BookSlotData) => void;
    onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ bookSlotData, onSubmit, onClose }) => {
    const [formData, setFormData] = useState<{ name: string; totalHours: number; totalSlots: number }>({
        name: "",
        totalHours: 1,
        totalSlots: 1,
    });

    // console.log(bookSlotData);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(454654654654);
        if (formData.name.trim() === "") {
            toast.error("Please enter your name.");
            return;
        }

        console.log(+bookSlotData.totalSlots! < +formData.totalSlots);
        console.log(+bookSlotData.totalSlots!);


        if (+bookSlotData.totalSlots! < +formData.totalSlots) {
            toast.error("Not have enough slots for booking please select less slots.");
            return;
        }

        onSubmit(formData);
    };

    return (
        <div className="max-w-md w-full bg-white p-4 md:p-6 rounded-lg shadow-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Book Parking Slot</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                    <label className="block text-gray-600 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                {/* Total Hours Input */}
                <div>
                    <label className="block text-gray-600 mb-1">Total Hours</label>
                    <input
                        type="number"
                        name="totalHours"
                        min="1"
                        value={formData.totalHours}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                {/* Total Slots Input */}
                <div>
                    <label className="block text-gray-600 mb-1">Total Slots</label>
                    <input
                        type="number"
                        name="totalSlots"
                        min="1"
                        value={formData.totalSlots}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div>
                    <p>Total amount: {+bookSlotData.amount! * +formData.totalHours * +formData.totalSlots}</p>
                </div>

                {/* Submit & Cancel Buttons */}
                <div className="space-y-2">
                    <Button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
                    >
                        Confirm Booking
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full py-2 rounded-lg font-semibold"
                        onClick={onClose}
                    >
                        Cancel Booking
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;
