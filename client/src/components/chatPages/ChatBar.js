import React, { useState, useEffect } from 'react';

const ChatBar = ({ socket }) => {
    const [users, setUsers] = useState();

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
                    {users?.map((user) => (
                        <p key={user._id}>{user.username}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatBar;