import { Fragment } from "react";
import {  useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import React, { useState, useRef, useEffect } from 'react';
import './Wishlist.css'

const Wishlist = () => {
  let { pathname } = useLocation();
  
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const chatMessagesRef = useRef(null);

  const sendMessage = () => {
    if (userInput.trim() === '') {
      return;
    }

    setMessages((prevMessages) => [...prevMessages, { type: 'user', text: userInput }]);
    setUserInput('');

    // Simulate a bot response (replace this with actual backend communication)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: 'Bot: Thanks for your message!' },
      ]);

      // Scroll to the bottom for the latest message
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }, 1000);
  };

  useEffect(() => {
    // Scroll to the bottom when messages change
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [messages]);

  return (
    <Fragment>
      <SEO
        titleTemplate="Wishlist"
        description="Wishlist page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Message", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
              <Fragment>
                <div className="App">
                <div className="chat-container">
                  <ul className="chat-messages" ref={chatMessagesRef}>
                    {messages.map((message, index) => (
                      <li key={index} className={`message ${message.type}-message`}>
                        {message.text}
                      </li>
                    ))}
                  </ul>
                  <div className="input-container">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Type your message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                  </div>
                </div>
              </div>
              </Fragment>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Wishlist;
