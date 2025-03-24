import { useState } from "react";
import BookingForm from "../components/ui/BookingForm";
import ParkingCard, { IParkingLot } from "../components/ui/ParkingCard"
import SearchBar from "../components/ui/SearchBar"
import ParkingSlotModal, { ParkingSlot } from "../components/ui/ParkingSlotDetailModal";
import { searchParkingSlot } from "../http/api";
import toast from "react-hot-toast";
import { useBookingSlotMutation } from "../hook/useBookingSlot";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

// const parkingLots: IParkingLot[] = [
//     {
//         name: "Sunset Mall Parking",
//         address: "456 Sunset Blvd, Los Angeles, CA 90028",
//         totalSlots: 30,
//         availableSlots: 5,
//         hourlyRate: "$7",
//         paymentMethods: "Card, UPI, Wallets",
//         status: "Inactive",
//         pinCode: "401501"
//     },
//     {
//         name: "Sunset Mall Parking",
//         address: "456 Sunset Blvd, Los Angeles, CA 90028",
//         totalSlots: 30,
//         availableSlots: 5,
//         hourlyRate: "$7",
//         paymentMethods: "Card, UPI, Wallets",
//         status: "Inactive",
//         pinCode: "401501"
//     },
// ];


// const parkingSlotVirar = {
//     name: "Virar West Parking",
//     address: "Near Virar Railway Station, Virar West, Maharashtra 401303",
//     totalSlots: 50,
//     availableSlots: 12,
//     hourlyRate: "$5",
//     pinCode: "401303",
//     status: "Active",
//     location: { lat: 19.455902, lng: 72.811400 } // Approximate coordinates for Virar
// };

export interface BookSlotData {
    clerkId?: string;
    name?: string;
    id?: string;
    totalHours?: number;
    totalSlots?: number;
    date?: string;
    amount?: number;
    paymentStatus?: string;
    availableSlots?: number;
}

function BookSlot() {
    const navigate = useNavigate();
    const { mutate } = useBookingSlotMutation();
    const { user } = useUser();
    const [bookSlot, setBookSlot] = useState<boolean>(false)
    const [viewSlot, setViewSlot] = useState<boolean>(false)
    const [viewSlotData, setViewSlotData] = useState<ParkingSlot | null>(null);
    const [bookSlotData, setBookSlotData] = useState<BookSlotData | null>(null);
    const [parkingLots, setParkingLots] = useState<IParkingLot[] | []>([])
    const [date, setDate] = useState("");
    const openBookingForm = (flag: boolean, data: BookSlotData) => {
        setBookSlot(flag);
        setBookSlotData(data)
    }

    const onClose = () => {
        setBookSlot(false)
    }

    const closeViewForm = () => {
        setViewSlot(false)
    }

    const openViewForm = (flag: boolean, data: ParkingSlot) => {
        setViewSlot(flag)
        setViewSlotData(data);
    }

    const handleSearchSlot = async (address: string, pinCode: string, newDate: string) => {
        try {
            const data = await searchParkingSlot({ address, pinCode, date: newDate });

            const formattedData = data.data.data.slots.map((slot: IParkingLot) => ({
                _id: slot._id,
                name: slot.name,
                address: slot.address,
                totalSlots: slot.totalSlots,
                availableSlots: slot.totalSlotsSum ? slot.totalSlots - slot.totalSlotsSum : slot.totalSlots,
                hourlyRate: slot.hourlyRate, // Adding currency sign
                pinCode: slot.pinCode,
                status: slot.status,
                location: {
                    lat: slot.location!.coordinates[0], // Extracting lat & lng
                    lng: slot.location!.coordinates[1],
                },
            }));

            setParkingLots(formattedData)
            setDate(newDate)
            toast.success("Search successful!");

        } catch (error) {
            console.log(error);
        }
    }

    const handleBookSlot = (data: BookSlotData) => {
        setBookSlotData({
            id: bookSlotData!.id!,
            date: date,
            name: data.name,
            totalHours: data.totalHours,
            totalSlots: data.totalSlots,
            amount: bookSlotData!.amount
        })

        mutate({
            clerkId: user!.id,
            id: bookSlotData!.id!,
            date: date,
            name: data.name,
            totalHours: data.totalHours,
            totalSlots: data.totalSlots!,
            amount: bookSlotData!.amount! * +data.totalHours! * +data.totalSlots!,
            paymentStatus: "Pending"
        })

        setTimeout(() => {
            navigate("/booked-slot")
        }, 1500)

        setBookSlot(false)
    }

    return (
        <div className="">
            <SearchBar handleSearchSlot={handleSearchSlot} />
            <ParkingCard parkingLots={parkingLots} openViewForm={openViewForm} openBookingForm={openBookingForm} />

            {bookSlot && <div className="h-screen w-full fixed inset-0 flex justify-center items-center bg-black/80 px-3">
                <BookingForm onClose={onClose} bookSlotData={bookSlotData!} onSubmit={handleBookSlot} key={2} />
            </div>}

            {viewSlot && viewSlotData !== null && <div className="h-screen w-full fixed inset-0 flex justify-center items-center bg-black/80 px-3">
                <ParkingSlotModal onClose={closeViewForm} slot={viewSlotData} isOpen={true} />
            </div>}
        </div>
    )
}

export default BookSlot