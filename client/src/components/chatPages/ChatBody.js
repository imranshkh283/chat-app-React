import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const ChatBody = ({ messages, typingStatus, lastMessageRef }) => {

    const navigate = useNavigate();

    const handleLeaveChat = async () => {
        // localStorage.removeItem('userName');
        const token = localStorage.getItem('userName');

        const decodedToken = jwtDecode(token);
        const { id } = decodedToken;
        const response = await fetch('http://localhost:4000/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: id })
        });

        if (response.ok) {

            navigate('/');
            window.location.reload();
        }

    };

    return (
        <>
            <header className="chat__mainHeader">
                <p>Hangout with Colleagues</p>
                <button className="leaveChat__btn" onClick={handleLeaveChat}>
                    LEAVE CHAT
                </button>
            </header>

            <div className="message__container">
                {messages.map((message, index) =>
                    message.name === localStorage.getItem('userName') ? (
                        <div className="message__chats" key={message.id}>
                            <p className="sender__name">You</p>
                            <div className="message__sender">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="message__chats" key={message.id}>
                            <p>{message.name}</p>
                            <div className="message__recipient">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    )
                )}

                {/*This is triggered when a user is typing*/}
                <div className='message__status'>
                    <p>{typingStatus}</p>
                </div>
                <div ref={lastMessageRef} />
            </div>
        </>
    );
};

export default ChatBody;