import { Outlet } from "react-router-dom"
import Navbar from "../components/ui/Navbar"
import { Toaster } from "react-hot-toast"

function SecureLayout() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Toaster />
        </div>
    )
}

export default SecureLayout