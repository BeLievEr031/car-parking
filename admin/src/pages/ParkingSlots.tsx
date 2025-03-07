import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ParkingTable from "../components/ui/ParkingTable"
import ParkingModal from "../components/ui/ParkingModal";
import { IPagination, ParkingSlot } from "../types";
import { toast } from "react-hot-toast";
import { useCreateCarSlotMutation, useDeleteCarSlotMutation, useFetchCarSlotQuery } from "../hook/useCarSlot";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";


const ParkingSlots: React.FC = () => {
    const { user } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { mutate } = useCreateCarSlotMutation();
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [parkingSlots, setParkingSlots] = useState<ParkingSlot[]>([
        {
            clerkId: "sf",
            name: "Downtown Plaza Parking",
            address: "123 Main St, New York, NY 10001",
            totalSlots: "45",
            availableSlots: "10",
            hourlyRate: "150",
            status: "Active",
            pinCode: "401501"
        },
        {
            clerkId: "asgdg",
            name: "Sunset Mall Parking",
            address: "456 Sunset Blvd, Los Angeles, CA 90028",
            totalSlots: "451",
            availableSlots: "4",
            hourlyRate: "150",
            status: "Inactive",
            pinCode: "401501"
        },
    ]);

    const [newSlot, setNewSlot] = useState<ParkingSlot>({
        clerkId: "",
        name: "",
        address: "",
        pinCode: "",
        totalSlots: "",
        availableSlots: "",
        hourlyRate: "",
        status: "Active",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value, type } = e.target;

        console.log(type);


        if (type === "number") {
            if (!/^\d*\.?\d*$/.test(value)) return; // Prevent non-numeric input
        }
        setNewSlot({ ...newSlot, [e.target.name]: e.target.value });
    };

    const getLatLng = async (address: string) => {
        const apiKey = "AIzaSyB95TJpqJwe-eE7RcYIR30IWYcfOatwiZM"; // Replace with your actual API key
        const encodedAddress = encodeURIComponent(address);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

        try {
            const response = await axios.get(url);
            const data = response.data;

            if (data.status === "OK") {
                const location = data.results[0].geometry.location;
                return location;
            } else {
                throw new Error("Geocoding failed: " + data.status);
            }
        } catch (error) {
            console.error("Error fetching location:", error);
            return null;
        }
    }

    const addOrUpdateSlot = async () => {
        // Trim values to remove extra spaces
        const trimmedSlot = {
            ...newSlot,
            name: newSlot.name.trim(),
            address: newSlot.address.trim(),
            pinCode: newSlot.pinCode.trim()
        };

        // Validation for each field with toast notifications
        if (!trimmedSlot.name) {
            toast.error("Parking Area Name is required.");
            return;
        }

        if (!trimmedSlot.address) {
            toast.error("Location/Address is required.");
            return;
        }

        if (!trimmedSlot.pinCode.match(/^\d{6}$/)) {
            toast.error("Pin Code must be a 6-digit number.");
            return;
        }

        if (!trimmedSlot.totalSlots || isNaN(+trimmedSlot.totalSlots) || +trimmedSlot.totalSlots < 1) {
            toast.error("Total Slots must be a valid number and at least 1.");
            return;
        }

        if (!trimmedSlot.availableSlots || isNaN(+trimmedSlot.availableSlots)) {
            toast.error("Availabel Slots must be a valid number.");
            return;
        }

        if (isNaN(+trimmedSlot.availableSlots) || +trimmedSlot.availableSlots < 0) {
            toast.error("Available Slots must be a valid number and at least 0.");
            return;
        }

        if (+trimmedSlot.availableSlots > +trimmedSlot.totalSlots) {
            toast.error("Available Slots cannot be greater than Total Slots.");
            return;
        }

        if (!trimmedSlot.hourlyRate || isNaN(+trimmedSlot.hourlyRate) || +trimmedSlot.hourlyRate < 0) {
            toast.error("Hourly Rate must be a valid positive number.");
            return;
        }

        if (!["Active", "Inactive"].includes(trimmedSlot.status)) {
            toast.error("Invalid status. Please select Active or Inactive.");
            return;
        }

        // If editing, update the existing slot
        if (isEditing && editIndex !== null) {
            const updatedSlots = [...parkingSlots];
            updatedSlots[editIndex] = trimmedSlot;
            setParkingSlots(updatedSlots);
            setIsEditing(false);
            setEditIndex(null);
            toast.success("Parking slot updated successfully!");
        } else {
            // setParkingSlots([...parkingSlots, trimmedSlot]); // Uncomment to enable adding
            const data = await getLatLng(trimmedSlot.address);
            const slotData: ParkingSlot = {
                ...newSlot,
                clerkId: user!.id,
                location: {
                    type: "Point",
                    coordinates: [data.lat, data.lng],
                }
            }

            mutate(slotData);
            setNewSlot({
                clerkId: "",
                name: "",
                address: "",
                pinCode: "",
                totalSlots: "",
                availableSlots: "",
                hourlyRate: "",
                status: "Active",
            })
            setIsModalOpen(false)
            toast.success("Parking slot added successfully!");
        }

    };

    const [pagination] = useState<IPagination>({
        clerkId: user!.id,
        limit: 25,
        order: "asc",
        page: 1,
        sortBy: "createdAt"
    })

    const { data } = useFetchCarSlotQuery(pagination);
    const { mutate: deleteMutate } = useDeleteCarSlotMutation();
    const handleDelete = (id: string) => {
        deleteMutate(id)
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-700">Parking Slots</h1>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                    <FaPlus /> Add Parking Slot
                </button>
            </div>

            {data?.data?.data?.slots.length === 0 ? <div>No booking slot found</div> : <ParkingTable parkingSlots={data?.data?.data?.slots.length !== 0 ? data?.data?.data?.slots : []} handleEdit={setEditIndex} handleDelete={handleDelete} />}
            <ParkingModal {...{ isModalOpen, setIsModalOpen, newSlot, handleChange, addOrUpdateSlot, isEditing }} />
        </div>
    );
};

export default ParkingSlots;
