import { FaCar, FaClock, FaCreditCard, FaMapMarkerAlt } from "react-icons/fa";
import ParkingMap from "../components/ui/Map";

const Home = () => {



    return (
        <div className="min-h-screen">
            {/* Navbar */}


            {/* Hero Section */}
            {/* <header className="relative h-[85vh] flex items-center justify-center text-center bg-cover bg-center bg-[url('/parking-hero.jpg')]">
                <div className="bg-black bg-opacity-50 p-10 rounded-lg text-white">
                    <h1 className="text-4xl font-bold">Find & Book Parking Instantly</h1>
                    <p className="mt-4 text-lg">Reserve your parking spot hassle-free and save time</p>
                    <div className="mt-6">
                        <input type="text" placeholder="Enter location..." className="p-3 w-80 rounded-l-md border-none focus:ring-2 focus:ring-blue-500" />
                        <button className="bg-blue-600 px-5 py-3 rounded-r-md text-white hover:bg-blue-700">Search</button>
                    </div>
                </div>
            </header> */}

            <div>
                <ParkingMap />
            </div>

            {/* How It Works Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
                    <div className="mt-10 grid md:grid-cols-4 gap-6">
                        <div className="p-6 shadow-md bg-gray-100 rounded-lg">
                            <FaMapMarkerAlt className="text-4xl text-blue-600 mx-auto" />
                            <h3 className="text-lg font-semibold mt-3">Search Location</h3>
                            <p className="text-gray-600 mt-2">Enter your destination to find nearby parking.</p>
                        </div>
                        <div className="p-6 shadow-md bg-gray-100 rounded-lg">
                            <FaCar className="text-4xl text-blue-600 mx-auto" />
                            <h3 className="text-lg font-semibold mt-3">Select Slot</h3>
                            <p className="text-gray-600 mt-2">Choose the best parking spot that suits your needs.</p>
                        </div>
                        <div className="p-6 shadow-md bg-gray-100 rounded-lg">
                            <FaCreditCard className="text-4xl text-blue-600 mx-auto" />
                            <h3 className="text-lg font-semibold mt-3">Pay Securely</h3>
                            <p className="text-gray-600 mt-2">Make an online payment through multiple options.</p>
                        </div>
                        <div className="p-6 shadow-md bg-gray-100 rounded-lg">
                            <FaClock className="text-4xl text-blue-600 mx-auto" />
                            <h3 className="text-lg font-semibold mt-3">Park & Enjoy</h3>
                            <p className="text-gray-600 mt-2">Reach the parking location and enjoy stress-free parking.</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Call to Action */}
            <section className="py-16 bg-blue-600 text-white text-center">
                <h2 className="text-3xl font-bold">Ready to Park Easily?</h2>
                <p className="mt-4 text-lg">Find a parking spot in seconds. Book now!</p>
                {/* <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
                    Get Started
                </button> */}
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-6 text-center">
                <p>© {new Date().getFullYear()} ParkEasy. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
