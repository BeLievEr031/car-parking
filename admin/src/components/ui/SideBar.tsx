import { useState } from "react";
import { FaBars, FaParking, FaUser } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Sidebar */}
            <div
                className={`bg-gray-900 text-white h-screen p-5 transition-all duration-300 ${isOpen ? "w-64" : "w-20"
                    }`}
            >
                <button
                    className="text-white text-xl mb-6"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FaBars />
                </button>

                <nav className="space-y-4">
                    {/* <Link
                        to="/"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
                    >
                        <FaThLarge />
                        {isOpen && <span>Dashboard</span>}
                    </Link> */}

                    <Link
                        to="/slots"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
                    >
                        <FaParking />
                        {isOpen && <span>Slots</span>}
                    </Link>
                    <Link
                        to="/bookings"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
                    >
                        <FaMoneyBillTrendUp />
                        {isOpen && <span>Bookings</span>}
                    </Link>
                    <Link
                        to="/users"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
                    >
                        <FaUsers />
                        {isOpen && <span>Users</span>}
                    </Link>
                    <Link
                        to="/profile"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
                    >
                        <FaUser />
                        {isOpen && <span>Profile</span>}
                    </Link>
                </nav>
            </div>

        </div>
    );
};

export default Sidebar;
