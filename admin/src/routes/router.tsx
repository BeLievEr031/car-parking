import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../layout/RootLayout'
import SecureLayout from '../layout/SecureLayout';
import Dashboard from '../pages/Dashboard';
import ParkingSlots from '../pages/ParkingSlots';
import BookingHistoryPage from '../pages/BookingHistory';
import AdminProfile from '../pages/AdminProfile';
import Auth from '../pages/Auth';
import Users from '../pages/Users';


const router = createBrowserRouter([
    {
        path: "",
        element: <RootLayout />,
        children: [
            {
                path: "",
                element: <SecureLayout />,
                children: [
                    {
                        path: "",
                        element: <Dashboard />
                    },
                    {
                        path: "slots",
                        element: <ParkingSlots />
                    },
                    {
                        path: "bookings",
                        element: <BookingHistoryPage />
                    },
                    {
                        path: "profile",
                        element: <AdminProfile />
                    },
                    {
                        path: "users",
                        element: <Users />
                    },
                ]
            },
            {
                path: 'auth',
                element: <Auth />
            }
        ],

    }
])

export default router;