import { useUser } from "@clerk/clerk-react";

const AdminProfile: React.FC = () => {
    const { user } = useUser()
    console.log(user!.imageUrl);

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center w-full">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
                <div className="relative w-32 h-32 mx-auto">
                    <img src={user!.imageUrl} alt="Profile" className="w-full h-full rounded-full border-4 border-blue-500" />
                </div>
                <h2 className="text-2xl font-bold mt-4 text-gray-700">
                    {user!.firstName + " " + user!.lastName}
                </h2>
                <p className="text-gray-500">{user?.emailAddresses[0].emailAddress}</p>
                <p className="text-blue-600 font-semibold mt-2">Admin</p>
                <p className="text-gray-500 text-sm">Joined: {user?.createdAt?.toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default AdminProfile;
