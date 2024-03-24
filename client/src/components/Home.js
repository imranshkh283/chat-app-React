import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ socket }) => {

    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:4000/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: userName, password })
        });
        if (response.ok) {
            // Handle success
            localStorage.setItem('userName', userName);

            // sends the username and socket ID to the Node.js server
            socket.emit('newUser', { userName, socketID: socket.id });
            navigate('/login');
            console.log('User registered successfully');
        } else {
            // Handle error
            console.error('Failed to register user');
        }

    };
    return (
        <form className="home__container" onSubmit={handleRegister}>
            <h2 className="home__header">Sign up to Open Chat</h2>

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
            <button className="home__cta">SIGN UP</button>
            <a href="/login" className="home__a">LOGIN</a>

        </form>
    );
};

export default Home;