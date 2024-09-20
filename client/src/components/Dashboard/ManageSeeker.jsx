import React, { useEffect, useState } from 'react';
import './Seeker.css';
import axios from 'axios';

const ManageSeeker = () => {
    const [userData, setUserData] = useState([]);

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/api/v1/user/getAllusers");
            if (data.success) {
                setUserData(data.users); // assuming the users are in data.users
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    console.log(userData);

    const users = userData;

    // Function to delete a seeker
    const deleteSeeker = async (seekerId) => {
        const userId = seekerId
        try {
            const deletedUser = await axios.delete(`http://localhost:4000/api/v1/user/delete-user/${userId}`)
            window.alert("User Deleted");
            window.location.reload();
        }
        catch(error){
            window.alert(error.message)
        }
        
    };

    return (
        <div className="containertable">
            <h1 className='manageseekersofjob'>Manage Job Seekers</h1><br />
            <table className='tableofmanageseekers'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(seeker => (
                        <tr key={seeker.id}>
                            <td>{seeker.name}</td>
                            <td>{seeker.email}</td>
                            <td>{seeker.role}</td>
                            <td>
                                <button onClick={() => deleteSeeker(seeker._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageSeeker;
