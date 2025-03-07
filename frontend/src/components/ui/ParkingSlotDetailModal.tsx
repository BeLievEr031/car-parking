import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Button from "../Button";

// Define the parking slot structure
export interface ParkingSlot {
    name: string;
    address: string;
    totalSlots: number;
    availableSlots: number;
    hourlyRate: string;
    pinCode: string;
    status: string;
    location: { lat: number; lng: number };
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    slot: ParkingSlot | null;
}

const ParkingSlotModal: React.FC<Props> = ({ onClose, slot }) => {
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [loading, setLoading] = useState(true);

    // Custom markers for Leaflet
    const userIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png", // User Icon
        iconSize: [30, 30],
        iconAnchor: [15, 30],
    });

    const parkingIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Parking Icon
        iconSize: [30, 30],
        iconAnchor: [15, 30],
    });

    // Fetch user's current location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setLoading(false);
                },
                (error) => {
                    console.error("Error fetching location", error);
                    setLoading(false);
                }
            );
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <div>
            {slot && <div className="mt-6 sm:w-[500px] w-[350px] bg-white p-4 md:p-6 rounded-lg shadow-md mx-auto">
                <h2 className="text-xl font-semibold mb-2">{slot.name}</h2>
                <p className="text-gray-600">{slot.address}</p>
                <p>Total Slots: <strong>{slot.totalSlots}</strong></p>
                <p>Available Slots: <strong>{slot.availableSlots}</strong></p>
                <p>Hourly Rate: <strong>{slot.hourlyRate}</strong></p>
                <p>Pincode: <strong>{slot.pinCode}</strong></p>

                {/* Loading animation */}
                {loading ? (
                    <div className="flex justify-center items-center my-4">
                        <p className="border-4 border-blue-500 animate-spin border-t-transparent w-10 h-10 rounded-full"></p>
                    </div>
                ) : (
                    userLocation && (
                        <MapContainer
                            center={userLocation}
                            zoom={14}
                            style={{ width: "100%", height: "300px", marginTop: "1rem" }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {/* User Location Marker */}
                            <Marker position={userLocation} icon={userIcon} />

                            {/* Parking Slot Marker */}
                            <Marker position={slot.location} icon={parkingIcon} />

                            {/* Route Polyline */}
                            <Polyline positions={[userLocation, slot.location]} color="red" weight={4} />
                        </MapContainer>
                    )
                )}

                {/* Close Button */}
                <Button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>
                    Close
                </Button>
            </div>}
        </div>

    );
};

export default ParkingSlotModal;
