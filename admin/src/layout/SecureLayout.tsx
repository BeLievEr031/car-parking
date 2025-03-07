import { Outlet } from "react-router-dom"
import Sidebar from "../components/ui/SideBar"
import { Toaster } from "react-hot-toast"

function SecureLayout() {
    return (
        <div className="flex">
            <Sidebar />
            <Outlet />
            <Toaster />
        </div>
    )
}

export default SecureLayout