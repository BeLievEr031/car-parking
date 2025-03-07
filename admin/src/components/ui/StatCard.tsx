import { FaParking, FaClipboardList, FaUsers, FaDollarSign } from "react-icons/fa";

const stats = [
    { id: 1, title: "Total Slots", value: 120, icon: <FaParking className="text-blue-500 text-3xl" /> },
    { id: 2, title: "Total Bookings", value: 450, icon: <FaClipboardList className="text-green-500 text-3xl" /> },
    { id: 3, title: "Total Users", value: 320, icon: <FaUsers className="text-purple-500 text-3xl" /> },
    { id: 4, title: "Total Revenue", value: "$12,500", icon: <FaDollarSign className="text-yellow-500 text-3xl" /> },
];

const StatsCard = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
            {stats.map((stat) => (
                <div
                    key={stat.id}
                    className="bg-white shadow-lg rounded-xl p-6 flex items-center space-x-4 transition-transform transform hover:scale-105"
                >
                    <div className="p-4 bg-gray-100 rounded-full">{stat.icon}</div>
                    <div>
                        <p className="text-gray-600 text-sm">{stat.title}</p>
                        <h2 className="text-2xl font-semibold text-gray-800">{stat.value}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCard;
