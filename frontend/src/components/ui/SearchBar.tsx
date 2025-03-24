import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Button from "../Button";

export interface ISearch {
    address: string;
    pin: string;
    date: string;
}

interface IProp {
    handleSearchSlot: (address: string, pin: string, newDate: string) => void;
}

const SearchBar: React.FC<IProp> = ({ handleSearchSlot }) => {
    const [address, setAddress] = useState("");
    const [pin, setPin] = useState("");
    const [departure, setDeparture] = useState("");

    const handleClick = async () => {
        // Validation
        if (!address.trim()) {
            toast.error("Please enter the location.");
            return;
        }
        if (!pin.trim() || pin.length !== 6) {
            toast.error("Please enter the proper pin code.");
            return;
        }
        if (!departure) {
            toast.error("Please select a booking date.");
            return;
        }

        try {
            handleSearchSlot(address, pin, departure);
            // console.log(address, pin, departure);
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while searching.");
        }
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="flex flex-col md:flex-row items-center border rounded-lg overflow-hidden  mx-auto shadow-md px-2 mt-4 w-11/12">
            {/* Address Input */}
            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-4 w-full md:w-1/4 border-b md:border-b-0 md:border-r outline-none"
            />

            {/* Pin Code Input */}
            <input
                type="text"
                placeholder="Pin Code"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="p-4 w-full md:w-1/4 border-b md:border-b-0 md:border-r outline-none"
            />

            {/* Departure Date */}
            <div className="p-4 w-full md:w-1/4 border-b md:border-b-0 md:border-r flex flex-col">
                <span className="text-gray-500 text-sm">Date & Time</span>
                <input
                    type="datetime-local"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    className="outline-none text-black"
                    min={today}
                />
            </div>

            {/* Search Button */}
            <Button
                className="bg-orange-500 mx-2 text-white px-6 py-4 font-semibold hover:bg-orange-600 w-full md:w-1/4"
                onClick={handleClick}
            >
                Search
            </Button>
        </div>
    );
};

export default SearchBar;
