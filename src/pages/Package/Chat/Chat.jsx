import React, { useState, useEffect, useRef, useContext } from "react"; // added useRef
import { FiMinimize2, FiMaximize2 } from "react-icons/fi";
import io from "socket.io-client";
import { AppContext } from "../../../appContext";
import "./Chat.css";

const socket = io(process.env.REACT_APP_API_URL_WITHOUT_SUFFIX, {
  path: "/api/v1/chat",
});

function formatVehicleData(freeVehicleData) {
  return `
    Registration Number: ${freeVehicleData.registrationNumber}
    Tax Status: ${freeVehicleData.taxStatus}
    Tax Due Date: ${freeVehicleData.taxDueDate}
    MOT Status: ${freeVehicleData.motStatus}
    Make: ${freeVehicleData.make}
    Year of Manufacture: ${freeVehicleData.yearOfManufacture}
    Engine Capacity: ${freeVehicleData.engineCapacity}
    CO2 Emissions: ${freeVehicleData.co2Emissions}
    Fuel Type: ${freeVehicleData.fuelType}
    Marked for Export: ${freeVehicleData.markedForExport}
    Colour: ${freeVehicleData.colour}
    Type Approval: ${freeVehicleData.typeApproval}
    Date of Last V5C Issued: ${freeVehicleData.dateOfLastV5CIssued}
    MOT Expiry Date: ${freeVehicleData.motExpiryDate}
    Wheelplan: ${freeVehicleData.wheelplan}
    Month of First Registration: ${freeVehicleData.monthOfFirstRegistration}
  `;
}

const Chat = () => {
  const { vehicleFreeData } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(true);
  const messagesEndRef = useRef(null); // Create a ref for the messages div
  const [isLoading, setIsLoading] = useState(false);

  const presetQuestions = ["How are you?"];
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    const messageListener = (data) => {
      setIsLoading(false);
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
    setMessages([...messages, { from: "user", text: messageToSend }]);
    setInput("");
    setIsLoading(true);

    if (socket !== null) {
      socket.emit("message", {
        input: messageToSend,
        order: formatVehicleData(vehicleFreeData),
        pageFrom: "package",
      });
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && isMinimized) {
        // Only maximize when it's minimized
        setIsMinimized(false); // Explicitly set the state to false to open/maximize
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
          onKeyDown={(e) => e.key === "Enter" && send()} // To send message with Enter key
        />
        <button className="send-chat-button" onClick={() => send(input)}>
          Ask
        </button>
      </div>
    </div>
  );
};

export default Chat;
