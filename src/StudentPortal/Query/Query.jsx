import React, { useState, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import api from "../../Api/Api";
import toast from "react-hot-toast";

const Query = () => {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [ans, setAns] = useState("");
  const synthRef = useRef(window.speechSynthesis);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    const loading = toast.loading("Wait! Getting answer");

    api
      .post("/google", { prompt: query })
      .then((res) => {
        toast.dismiss(loading);
        setAns(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        toast.dismiss(loading);
        toast.error(err.message);
      });
  };

  const navigate = useNavigate();

  const askAlumni = () => {
    navigate("/alumni");
  };

  const askAI = (query) => {
    const response = "This is a response from AI for query: " + query;
    setChatHistory([...chatHistory, { text: response, from: "AI" }]);
  };

  const speakResponse = () => {
    if (ans) {
      const utterance = new SpeechSynthesisUtterance(ans);
      synthRef.current.speak(utterance);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="container mx-auto p-4 sm:ml-64"
        style={{ maxWidth: "80%" }}
      >
        <h1 className="text-4xl font-bold text-center mb-8">Forum</h1>

        <form onSubmit={handleQuerySubmit} className="mt-4">
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Type your query here..."
            className="w-full border rounded p-3 shadow-md bg-blue-900 text-white placeholder-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={askAlumni}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md border border-blue-500 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            Ask Alumni
          </button>
          <button
            onClick={handleQuerySubmit}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md border border-green-500 shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
          >
            Ask AI
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setAns("");
            }}
            className="btn absolute right-1 top-6  bg-blue-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Clear
          </button>
          <button
            onClick={speakResponse}
            className="btn absolute right-20 top-6 bg-green-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Speak
          </button>
          <textarea
            placeholder="AI response"
            value={ans}
            className="w-full h-[70vh] mt-4 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white"
            style={{ boxShadow: "0 0 10px rgba(0, 0, 255, 0.5)" }}
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default Query;
