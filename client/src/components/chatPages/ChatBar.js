import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
const ChatBar = ({ socket }) => {
    const [users, setUsers] = useState();

    const token = localStorage.getItem('userName');

    const decodedToken = jwtDecode(token);
    const { id } = decodedToken;

    const getOnlineUsers = async () => {
        const response = await fetch('http://localhost:4000/user/online', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setUsers(data);
        }
    }

    useEffect(() => {
        getOnlineUsers();
        socket.on('newUserResponse', () => getOnlineUsers());
    }, []);

    return (
        <div className="chat__sidebar">
            <h2>Open Chat</h2>
            <div>
                <h4 className="chat__header">ACTIVE USERS</h4>
                <div className="chat__users">
                    {users && users.length > 0 ? (
                        users
                            .filter((user) => user._id !== id)
                            .map((user) => (
                                <p key={user._id}>{user.username}</p>
                            ))
                    ) : (
                        <p>No users available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatBar;