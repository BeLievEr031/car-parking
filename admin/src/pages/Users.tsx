import axios from 'axios';
import { useEffect, useState } from 'react'
import { ResponseUserHistory, UserHistory } from '../types';
import UserTable from '../components/ui/UserTable';

function Users() {
    const [users, setUsers] = useState<UserHistory[] | []>([])
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/fetch-users");

                console.log(response.data);
                const mappedUsers = response.data.map((user: ResponseUserHistory) => ({
                    firstName: user.first_name,
                    lastName: user.last_name,
                    email: user.email_addresses[0]?.email_address || "N/A",
                    createdAt: new Date(user.created_at).toISOString(),
                    status: user.banned || user.locked ? "Inactive" : "Active",
                }));

                setUsers(mappedUsers)
            } catch (error) {
                console.log(error);

            }
        }

        fetchUsers();

    }, [])
    return (
        <div className='w-full'>
            <UserTable userHistory={users} />
        </div>
    )
}

export default Users