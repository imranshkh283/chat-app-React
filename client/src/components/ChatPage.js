import React from 'react';
import ChatBar from './chatPages/ChatBar';
import ChatBody from './chatPages/ChatBody';
import ChatFooter from './chatPages/ChatFooter';

const ChatPage = ({ socket }) => {
    return (
        <div className="chat">
            <ChatBar />
            <div className="chat__main">
                <ChatBody />
                <ChatFooter />
            </div>
        </div>
    );
};

export default ChatPage;