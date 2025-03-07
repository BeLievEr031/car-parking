import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Button from "../Button";
import { ParkingSlot } from "./ParkingSlotDetailModal";
import { BookSlotData } from "../../pages/BookSlot";

// Parking Lot Data Interface
export interface IParkingLot {
    _id?: string;
    name: string;
    address: string;
    totalSlots: number;
    availableSlots: number;
    hourlyRate: string;
    paymentMethods: string;
    status: "Active" | "Inactive";
    pinCode: string;
    location?: {
        lat?: number,
        lng?: number
        coordinates: [number, number]
    }
}

// Props Interface
interface IProp {
    parkingLots: IParkingLot[] | [];
    openBookingForm: (flage: boolean, data: BookSlotData) => void;
    openViewForm: (flag: boolean, data: ParkingSlot) => void;
}

const ParkingCard: React.FC<IProp> = ({ parkingLots, openBookingForm, openViewForm }) => {
    // console.log(parkingLots);

    return (
        <div className="max-w-4xl mx-auto p-4">
            {parkingLots.map((lot: IParkingLot, index: number) => (
                <div
                    key={index}
                    className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col justify-between border"
                >
                    {/* Left Section: Parking Details */}
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold text-blue-500 ">{lot.name}</h2>
                        <p className="text-gray-500 flex items-center">
                            <FaMapMarkerAlt className="text-red-500 mr-1" />
                            {lot.address}
                        </p>
                        <p className="text-gray-500">Pincode: <span className="font-semibold">{lot.pinCode}</span></p>
                    </div>

                    {/* Middle Section: Slots & Pricing */}
                    <div className="text-center flex justify-between">
                        <p className="text-gray-600">
                            Total Slots: <span className="font-semibold">{lot.totalSlots}</span>
                        </p>
                        <p className="text-gray-600">
                            Available: <span className="font-semibold">{lot.availableSlots}</span>
                        </p>
                        <p className="text-gray-600">
                            Hourly Rate: <span className="font-semibold">{lot.hourlyRate}</span>
                        </p>
                    </div>

                    {/* Right Section: Status & Action */}
                    <div className="flex items-end justify-between mt-2">

                        <p className={`text-sm font-semibold px-3 py-1 rounded-md ${lot.status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                            {lot.status}
                        </p>

                        <div className="flex gap-2">
                            <Button
                                className="bg-blue-500 text-white px-5 py-2 rounded-md font-semibold hover:bg-blue-600 mt-3"
                                onClick={() => {
                                    console.log(lot.hourlyRate);
                                    openBookingForm(true, { id: lot._id!, amount: +lot.hourlyRate })
                                }}
                            >
                                Book
                            </Button>
                            <Button
                                className="bg-blue-500 text-white px-5 py-2 rounded-md font-semibold hover:bg-blue-600 mt-3"
                                onClick={() => openViewForm(true, {
                                    address: lot.address,
                                    availableSlots: lot.availableSlots,
                                    hourlyRate: lot.hourlyRate,
                                    location: { lat: lot.location!.lat!, lng: lot.location!.lng! },
                                    name: lot.name,
                                    pinCode: lot.pinCode,
                                    status: lot.status,
                                    totalSlots: lot.totalSlots
                                })}
                            >
                                View
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ParkingCard;
