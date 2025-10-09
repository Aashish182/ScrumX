import React, { useState, useEffect, useRef } from "react";
import SideBar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { UserCheck, CheckSquare, Clock, AlertTriangle } from "lucide-react";

const DeveloperHome = () => {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector((state) => state.user.user);

  const [standupStarted, setStandupStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [botTyping, setBotTyping] = useState(false);

  const chatEndRef = useRef(null);

  const botQuestions = [
    "Hi! What did you work on yesterday? 💻",
    "Any blockers or challenges you faced? ⚠️",
    "What are your tasks for today? 📅",
  ];

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, botTyping]);

  const handleStartStandup = () => {
    setStandupStarted(true);
    setBotTyping(true);
    setTimeout(() => {
      setMessages([{ sender: "bot", text: botQuestions[0], time: new Date() }]);
      setBotTyping(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input, time: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    if (questionIndex + 1 < botQuestions.length) {
      setBotTyping(true);
      setTimeout(() => {
        setQuestionIndex((prev) => prev + 1);
        const botMessage = {
          sender: "bot",
          text: botQuestions[questionIndex + 1],
          time: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setBotTyping(false);
      }, 1200);
    } else {
      setBotTyping(true);
      setTimeout(() => {
        const botMessage = {
          sender: "bot",
          text: "🎉 Great! Your daily standup is complete. Have a productive day!",
          time: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setBotTyping(false);
      }, 1200);
    }
  };

  const formatTime = (date) => {
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <SideBar />

      <main className={`flex-1 ${isOpen ? "ml-64" : "ml-20"} p-6`}>
        {!standupStarted ? (
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-10 rounded-xl shadow-2xl w-full max-w-2xl mx-auto mt-12 text-center animate-fade-in">
            <UserCheck size={50} className="mx-auto mb-4 text-green-400" />
            <h1 className="text-4xl font-bold mb-4 text-green-400">
              Hi {user?.name || "Developer"}!
            </h1>
            <p className="text-lg mb-6 text-gray-300">
              I hope you completed your tasks yesterday. ✅
            </p>
            <p className="text-lg mb-6 text-gray-300">
              Can we start the daily standup to acknowledge your project progress?
            </p>
            <button
              onClick={handleStartStandup}
              className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
            >
              Start Daily Standup
            </button>
          </div>
        ) : (
          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-2xl mx-auto mt-12 flex flex-col h-[600px]">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2 text-green-400">
              <CheckSquare size={28} /> Daily Standup
            </h1>
            <div className="flex-1 overflow-y-auto mb-4 flex flex-col space-y-3 px-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex items-end gap-2">
                    {msg.sender === "bot" && (
                      <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-black font-bold">
                        B
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-lg max-w-[70%] shadow-md relative ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                          : "bg-gray-700 text-white border-l-4 border-green-400"
                      }`}
                    >
                      <span>{msg.text}</span>
                      <span className="absolute text-xs text-gray-300 bottom-1 right-2">
                        {formatTime(msg.time)}
                      </span>
                    </div>
                    {msg.sender === "user" && (
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user?.name?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {botTyping && (
                <div className="flex justify-start items-center gap-2">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-black font-bold">
                    B
                  </div>
                  <div className="bg-gray-700 text-white p-3 rounded-lg max-w-[40%] relative animate-pulse">
                    <span className="flex space-x-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></span>
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-400"></span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef}></div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-3 rounded-lg bg-gray-700 text-white focus:outline-none placeholder-gray-400"
                placeholder="Type your answer..."
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-500 hover:bg-green-600 px-4 py-3 rounded-lg font-semibold transition-transform transform hover:scale-105"
              >
                Send
              </button>
            </div>

            <div className="flex justify-between mt-2 text-gray-400 text-sm">
              <span>
                <Clock size={16} /> Scrum Bot
              </span>
              <span>
                <AlertTriangle size={16} /> Standup Reminder
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DeveloperHome;
