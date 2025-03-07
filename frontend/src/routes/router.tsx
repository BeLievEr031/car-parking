import { createBrowserRouter } from "react-router-dom"
import RootLayout from "../layouts/RootLayout";
import SecureLayout from "../layouts/SecureLayout";
import Home from "../pages/Home";
import BookSlot from "../pages/BookSlot";
import BookedSlot from "../pages/BookedSlot";
import Auth from "../pages/Auth";


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
                        element: <Home />
                    },
                    {
                        path: "book-slot",
                        element: <BookSlot />
                    },
                    {
                        path: "booked-slot",
                        element: <BookedSlot />
                    },
                ]
            },
            {
                path: 'auth',
                element: <Auth />
            }
        ]
    }
])
export default router;