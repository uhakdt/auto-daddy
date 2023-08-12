import React, { useState, useEffect, useContext } from "react";
import { FiMinimize2, FiMaximize2 } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import io from "socket.io-client";
import { AppContext } from "../../../appContext";

const socket = io(process.env.REACT_APP_API_URL_WITHOUT_SUFFIX, {
  path: "/api/v1",
});

const Chat = ({ currentOrder }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

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

  if (isMinimized) {
    return (
      <div style={styles.minimizedChat}>
        <button
          style={styles.minimizeButton}
          onClick={() => setIsMinimized(false)}
        >
          <FiMaximize2 style={styles.minimizeIcon} />
        </button>
      </div>
    );
  }

  return (
    <div style={styles.chatbot}>
      <button
        style={styles.minimizeButton}
        onClick={() => setIsMinimized(true)}
      >
        <FiMinimize2 style={styles.minimizeIcon} />
      </button>
      <div style={styles.messages}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={
              message.from === "user"
                ? styles.userMessage
                : styles.serverMessage
            }
          >
            {message.from === "user" ? (
              <FaUserAlt style={{ marginRight: "10px" }} />
            ) : (
              <img
                style={styles.avatar}
                src="https://picsum.photos/200"
                alt="avatar"
              />
            )}
            <div>{message.text}</div>
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button style={styles.button} onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  chatbot: {
    position: "fixed",
    bottom: 0,
    width: "80%",
    left: "10%",
    backgroundColor: "white",
    padding: "40px",
    fontSize: "25px",
    boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
  },
  messages: {
    maxHeight: "70vh",
    overflowY: "scroll",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  userMessage: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  serverMessage: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    justifyContent: "flex-end",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: "10px",
  },
  inputContainer: {
    display: "flex",
    marginTop: "10px",
  },
  input: {
    flex: "1",
    marginRight: "10px",
  },
  button: {
    width: "100px",
  },
  minimizeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  minimizeIcon: {
    width: "20px",
    height: "20px",
  },
  minimizedChat: {
    position: "fixed",
    bottom: 0,
    width: "80px",
    height: "80px",
    left: "10%",
    backgroundColor: "white",
    padding: "10px",
    boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default Chat;
