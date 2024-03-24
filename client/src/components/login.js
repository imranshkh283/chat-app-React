import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ socket }) => {

    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {

        e.preventDefault();

        const response = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: userName, password })
        });

        if (response.ok) {

            const { token } = await response.json();
            // Handle success
            localStorage.setItem('userName', token);

            // sends the username and socket ID to the Node.js server
            socket.emit('newUser', { userName, socketID: socket.id });
        } else {
            // Handle error
            console.error('Failed to register user');
        }
        navigate('/chat');
    };
    return (
        <form className="home__container" onSubmit={handleLogin}>
            <h2 className="home__header">Sign in to Open Chat</h2>

            <input
                type="text"
                minLength={6}
                name="username"
                id="username"
                className="username__input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder='username'
            />
            <input
                type='password'
                minLength={6}
                name='password'
                className='password__input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
            />
            <button className="home__cta">SIGN IN</button>
        </form>
    );
};

export default Login;