import axios from "axios";
import { useState } from "react";
import { FaParking, FaClipboardList, FaUsers, FaDollarSign } from "react-icons/fa";

const StatsCard = () => {
    const [stats, setStats] = useState([
        { id: 1, title: "Total Slots", value: 0, icon: <FaParking className="text-blue-500 text-3xl" /> },
        { id: 2, title: "Total Bookings", value: 0, icon: <FaClipboardList className="text-green-500 text-3xl" /> },
        { id: 3, title: "Total Users", value: 0, icon: <FaUsers className="text-purple-500 text-3xl" /> },
        { id: 4, title: "Total Revenue", value: "$0", icon: <FaDollarSign className="text-yellow-500 text-3xl" /> }
    ]);

    const [loading, setLoading] = useState(false);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/stat");
            const { slots, booking, amount, totalUsers } = response.data;

            setStats([
                { id: 1, title: "Total Slots", value: slots, icon: <FaParking className="text-blue-500 text-3xl" /> },
                { id: 2, title: "Total Bookings", value: booking, icon: <FaClipboardList className="text-green-500 text-3xl" /> },
                { id: 3, title: "Total Users", value: totalUsers, icon: <FaUsers className="text-purple-500 text-3xl" /> },
                { id: 4, title: "Total Revenue", value: `$${amount.toLocaleString()}`, icon: <FaDollarSign className="text-yellow-500 text-3xl" /> }
            ]);
        } catch (error) {
            console.error("Error fetching stats:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <button
                className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg transition-transform transform hover:scale-105"
                onClick={fetchStats}
                disabled={loading}
            >
                {loading ? "Generating..." : "Generate Report"}
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-5">
                {stats.map((stat) => (
                    <div
                        key={stat.id}
                        className="bg-white shadow-lg rounded-xl p-6 flex items-center space-x-4 transition-transform transform hover:scale-105"
                    >
                        <div className="p-4 bg-gray-100 rounded-full">{stat.icon}</div>
                        <div>
                            <p className="text-gray-600 text-sm">{stat.title}</p>
                            <h2 className="text-2xl font-semibold text-gray-800">
                                {loading ? (
                                    <span className="animate-pulse">...</span>
                                ) : (
                                    stat.value
                                )}
                            </h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsCard;
