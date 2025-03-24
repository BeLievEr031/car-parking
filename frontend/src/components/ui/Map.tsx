import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useState } from "react";
import { useFetchCarSlotQuery } from "../../hook/useCarSlot";
import { IPagination } from "../../types";
import { useUser } from "@clerk/clerk-react";

// Define a custom icon for markers
const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [30, 41],
    iconAnchor: [15, 41],
    popupAnchor: [1, -34],
});

// Define TypeScript interface for parking slots
interface ParkingSlot {
    name: string;
    address: string;
    location: {
        coordinates: [number, number]
    }
}

// Component to handle zooming into a marker when clicked
const ZoomToLocation = ({ lat, lng }: { lat: number; lng: number }) => {
    const map = useMap();

    const handleClick = () => {
        map.setView([lat, lng], 14, { animate: true });
    };

    return (
        <button onClick={handleClick} className="text-blue-600 underline">
            Zoom Here
        </button>
    );
};

const ParkingMap = () => {
    // const [parkingSlots] = useState([
    //     { name: "Connaught Place Parking", address: "Connaught Place, New Delhi", lat: 28.6315, lng: 77.2167 },
    //     { name: "MG Road Parking", address: "MG Road, Bengaluru", lat: 12.9740, lng: 77.6072 },
    //     { name: "Marine Drive Parking", address: "Marine Drive, Mumbai", lat: 18.9440, lng: 72.8235 },
    //     { name: "Hitech City Parking", address: "Hitech City, Hyderabad", lat: 17.4483, lng: 78.3915 },
    //     { name: "Park Street Parking", address: "Park Street, Kolkata", lat: 22.5535, lng: 88.3507 },
    //     { name: "Sector 18 Parking", address: "Sector 18, Noida", lat: 28.5708, lng: 77.3260 },
    //     { name: "Anna Nagar Parking", address: "Anna Nagar, Chennai", lat: 13.0838, lng: 80.2170 },
    //     { name: "Law Garden Parking", address: "Law Garden, Ahmedabad", lat: 23.0270, lng: 72.5625 },
    //     { name: "Koregaon Park Parking", address: "Koregaon Park, Pune", lat: 18.5362, lng: 73.8929 },
    //     { name: "Hazratganj Parking", address: "Hazratganj, Lucknow", lat: 26.8500, lng: 80.9480 },
    // ]);
    const { user } = useUser();
    const [pagination] = useState<IPagination>({
        clerkId: user ? user!.id : "",
        limit: 25,
        order: "asc",
        page: 1,
        sortBy: "createdAt"
    })
    const { data } = useFetchCarSlotQuery(pagination);
    console.log(data?.data?.data?.slots);

    return (
        <div className="h-96 w-11/12 mx-auto mt-3 rounded-xl overflow-hidden">
            <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-full w-full">
                {/* Map Tile */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Markers for Parking Slots */}
                {data?.data?.data?.slots.length !== 0 ? data?.data?.data?.slots.map((slot: ParkingSlot, index: number) => (
                    <Marker key={index} position={slot.location.coordinates} icon={customIcon}>
                        <Popup>
                            <h3 className="font-bold">{slot.name}</h3>
                            <p className="text-sm">{slot.address}</p>
                            <ZoomToLocation lat={slot.location.coordinates[0]} lng={slot.location.coordinates[1]} />
                        </Popup>
                    </Marker>
                )) : ""}
            </MapContainer>
        </div>
    );
};

export default ParkingMap;
