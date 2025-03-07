import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "@clerk/clerk-react";
import Button from "../Button";

function Navbar() {
    const { signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Get the current route

    // Function to check if the link is active
    const isActive = (path: string) => location.pathname === path ? "text-blue-600 font-semibold" : "text-gray-700";

    return (
        <nav className="bg-white shadow-md p-4 w-full z-[999] sticky top-0">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    ParkEasy
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className={`${isActive("/")} hover:text-blue-600`}>Home</Link>
                    <Link to="/book-slot" className={`${isActive("/book-slot")} hover:text-blue-600`}>Book a Slot</Link><Link to="/booked-slot" className={`${isActive("/booked-slot")} block hover:text-blue-600`} onClick={() => setIsOpen(false)}>Booked Slots</Link>
                    {/* <Link to="/contact" className={`${isActive("/contact")} hover:text-blue-600`}>Contact</Link> */}
                    <Button className="text-white bg-red-500 px-4 py-2 rounded text-center" onClick={() => signOut()}>Logout</Button>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-md p-4 space-y-4 absolute top-[60px] left-0 w-full">
                    <Link to="/" className={`${isActive("/")} block hover:text-blue-600`} onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/book-slot" className={`${isActive("/book-slot")} block hover:text-blue-600`} onClick={() => setIsOpen(false)}>Book a Slot</Link>
                    <Link to="/booked-slot" className={`${isActive("/booked-slot")} block hover:text-blue-600`} onClick={() => setIsOpen(false)}>Booked Slots</Link>
                    <Link to="/contact" className={`${isActive("/contact")} block hover:text-blue-600`} onClick={() => setIsOpen(false)}>Contact</Link>

                    <Button className="text-white bg-red-500 px-4 py-2 rounded text-center" onClick={() => signOut()}>Logout</Button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
