import React, { useState, useEffect, useRef } from "react";

import io from "socket.io-client";

import { FiMinimize2, FiMaximize2 } from "react-icons/fi";
import "./Chat.css";

const socket = io(process.env.REACT_APP_API_URL_WITHOUT_SUFFIX, {
  path: "/api/v1/chat",
});

const Chat = ({ currentOrder, registrationNumber }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(true);
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const presetQuestions = [
    "Why would this be a GOOD car?",
    "Why would this be a BAD car?",
    "Are there any major MOT Failures?",
    "What should I ask the Dealer?",
  ];
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    const messageListener = (data) => {
      setIsLoading(false);
      setIsPending(false);
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

  const send = (messageToSend = input) => {
    if (isPending) return;

    setIsPending(true);
    setMessages([...messages, { from: "user", text: messageToSend }]);
    setInput("");
    setIsLoading(true);
    setIsMinimized(false);

    if (socket !== null) {
      socket.emit("message", {
        input: messageToSend,
        order: currentOrder["extractedData"],
        pageFrom: "dashboard",
        registrationNumber: registrationNumber,
      });
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && isMinimized) {
        setIsMinimized(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isMinimized]);

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <div style={{ alignSelf: "center" }}>Ask ChatGPT Below</div>

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
      </div>

      <div className={`messages ${!isMinimized ? "open" : ""}`}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.from === "user" ? "userMessage" : "serverMessage"
            }
          >
            <div className="chat-title">
              {message.from === "user" ? "Your Question:" : "GPT Answer:"}
            </div>
            <div>{message.text}</div>
            {message.from !== "user" && (
              <div className="chatGPTLabel">Powered by ChatGPT</div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
        <div className={`messages ${!isMinimized ? "open" : ""}`}>
          {isLoading && (
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </div>
      </div>
      <div className={`content-area ${!isMinimized ? "open" : ""}`}>
        <div className="preset-questions">
          {presetQuestions.map((question, index) => (
            <button
              key={index}
              className="preset-question"
              onClick={() => {
                setInput(question);
                send(question);
              }}
            >
              {question}
            </button>
          ))}
        </div>
      </div>
      <div className="inputContainer">
        <input
          className="chat-input"
          value={input}
          placeholder="Your Question"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button className="send-chat-button" onClick={() => send(input)}>
          Ask
        </button>
      </div>
    </div>
  );
};

export default Chat;
