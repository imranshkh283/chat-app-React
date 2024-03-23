import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

const Home = () => {
    const navigation = useNavigate();
    const [userName, SetUserName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userName', userName)
        navigation('/chat');
    }


    return (
        <Form className="home__container" onSubmit={handleSubmit}>
            <h2 className="home__header">Sign in to Open Chat</h2>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                minLength={6}
                name="username"
                id="username"
                className="username__input"
                value={userName}
                onChange={(e) => SetUserName(e.target.value)}
            />
            <button className="home__cta">SIGN IN</button>
        </Form>
    )
}