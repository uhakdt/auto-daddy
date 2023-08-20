import React, { useState, useEffect, useRef } from "react"; // added useRef
import { FiMinimize2, FiMaximize2 } from "react-icons/fi";
import io from "socket.io-client";
import { AppContext } from "../../../appContext";
import "./Chat.css";

const socket = io(process.env.REACT_APP_API_URL_WITHOUT_SUFFIX, {
  path: "/api/v1/chat",
});

const Chat = ({ currentOrder }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null); // Create a ref for the messages div

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    const messageListener = (data) => {
      setMessages((currentMessages) => [
        ...currentMessages,
        { from: "server", text: data },
      ]);
    };
    socket.on("message", messageListener);

    return () => {
      socket.off("message", messageListener);
    };
  }, [socket]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const send = () => {
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");

    if (socket !== null) {
      socket.emit("message", {
        input: input,
        order: currentOrder["extractedData"],
      });
    }
  };

  return (
    <div className="chatbot">
      <button
        className="minimizeButton"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        {isMinimized ? (
          <FiMaximize2 className="minimizeIcon" />
        ) : (
          <FiMinimize2 className="minimizeIcon" />
        )}
      </button>
      <div className={`messages ${!isMinimized ? "open" : ""}`}>
        {" "}
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.from === "user" ? "userMessage" : "serverMessage"
            }
          >
            {message.from === "user" ? (
              <>
                <div className="chat-title">Your Question:</div>
                <div>{message.text}</div>
              </>
            ) : (
              <>
                <div className="chat-title">GPT Answer:</div>
                <div>{message.text}</div>
                <div className="chatGPTLabel">Powered by ChatGPT</div>
              </>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="inputContainer">
        <input
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="send-chat-button" onClick={send}>
          Ask
        </button>
      </div>
    </div>
  );
};

export default Chat;
