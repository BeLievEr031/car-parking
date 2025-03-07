import { UserHistory } from "../../types/index";

interface UserTableProps {
    userHistory: UserHistory[];
}

const UserTable: React.FC<UserTableProps> = ({ userHistory }) => {
    return (
        <div className="overflow-x-auto w-full h-scree px-4 mt-2">
            <h1 className="text-2xl font-bold my-4">Users Information</h1>
            <table className="min-w-full bg-white shadow-md rounded-lg border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-3 text-left">First Name</th>
                        <th className="p-3 text-left">Last Name</th>
                        <th className="p-3 text-left">Email Address</th>
                        <th className="p-3 text-left">Created At</th>
                        <th className="p-3 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {userHistory.map((user, index) => (
                        <tr key={index} className="border-t">
                            <td className="p-3">{user.firstName}</td>
                            <td className="p-3">{user.lastName}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">{new Date(user.createdAt).toLocaleString()}</td>
                            <td className={`p-3 font-semibold ${user.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                                {user.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
