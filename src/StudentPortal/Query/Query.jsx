import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import api from "../../Api/Api";
import toast from "react-hot-toast";

const Query = () => {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [ans, setAns] = useState([]);

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
    // const response = "This is a response from an alumni.";
    // setChatHistory([...chatHistory, { text: response, from: 'alumni' }]);
  };

  const askAI = (query) => {
    const response = "This is a response from AI for query: " + query;
    setChatHistory([...chatHistory, { text: response, from: "AI" }]);
  };

  return (
    <>
      <Navbar bgColor="forum"/>
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
        {/* <div className="relative">
          <button onClick={() => { setAns('') }} className="btn absolute right-1 top-6 right-4">clear</button>
          <textarea placeholder="ai ans" value={ans} className="w-full h-[70vh] mt-4"></textarea>
        </div> 
        */}

        {/* <div className="relative">
          <button
            onClick={() => {
              setAns("");
            }}
            className="btn absolute top-6 right-4 bg-blue-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Clear
          </button>
          <textarea
            placeholder="AI response"
            value={ans}
            className="w-full h-[70vh] mt-4 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
        </div> */}

        <div className="relative">
          <button
            onClick={() => {
              setAns("");
            }}
            className="btn absolute right-1 top-6  bg-blue-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Clear
          </button>
          <textarea
            placeholder="AI response"
            value={ans}
            className="w-full h-[70vh] mt-4 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white"
            style={{ boxShadow: "0 0 10px rgba(0, 0, 255, 0.5)" }}
          ></textarea>
        </div>

        <section
          className=" text-gray-100 py-32 min-h-screen"
          style={{ color: "black" }}
        >
          <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
            <h2 className="mb-12 text-4xl font-bold leadiF sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col divide-y divide-gray-700">
              <details style={{ fontSize: "1.3rem" }}>
                <summary className="py-2 outline-none cursor-pointer focus:underline">
                  What documents should I bring to the interview?
                </summary>
                <div className="px-4 pb-4">
                  <p>
                    You can easily place an order on our website by browsing our
                    product catalog, selecting the items you want, and adding
                    them to your cart. Then, proceed to checkout, where you can
                    provide your shipping and payment information to complete
                    the order.
                  </p>
                </div>
              </details>
              <details style={{ fontSize: "1.3rem" }}>
                <summary className="py-2 outline-none cursor-pointer focus:underline">
                  What are the prequisites for attending an interview
                </summary>
                <div className="px-4 pb-4">
                  <p>
                    We accept various payment methods, including credit cards,
                    debit cards, net banking, and mobile wallet payments. You
                    can choose the payment option that is most convenient for
                    you during the checkout process.
                  </p>
                </div>
              </details>
              <details style={{ fontSize: "1.3rem" }}>
                <summary className="py-2 outline-none cursor-pointer focus:underline">
                  How can students interact with the companies listed{" "}
                </summary>
                <div className="px-4 pb-4">
                  <p>
                    Shipping times may vary depending on your location and the
                    shipping method chosen. Typically, orders are processed
                    within 1-2 business days, and delivery can take 3-7 business
                    days within India. You will receive a tracking notification
                    once your order is shipped.
                  </p>
                </div>
              </details>
              <details style={{ fontSize: "1.3rem" }}>
                <summary className="py-2 outline-none cursor-pointer focus:underline">
                  Should I research the company before the interview?
                </summary>
                <div className="px-4 pb-4">
                  <p>
                    Yes, we have a hassle-free return policy. If you are not
                    satisfied with your purchase, you can initiate a return
                    within 30 days of receiving the product. Please contact our
                    customer support at{" "}
                    <a href="" className="underline">
                      example@gmail.com
                    </a>{" "}
                    for assistance.
                  </p>
                </div>
              </details>
              <details style={{ fontSize: "1.3rem" }}>
                <summary className="py-2 outline-none cursor-pointer focus:underline">
                  Are there any additional steps or requirements I should be
                  aware of before the interview?
                </summary>
                <div className="px-4 pb-4">
                  <p>
                    Currently, we only provide shipping services within India.
                    However, we may consider expanding our shipping options to
                    international locations in the future. Please stay updated
                    with our website for any changes in shipping destinations.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const Accordion = ({ title, children, color }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border border-blue-300 rounded-lg overflow-hidden ${color} shadow-md transition duration-300 mb-4`}
    >
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold py-3 px-4">{title}</h3>
        <span className="text-blue-500 px-4">{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && <div className="px-4 py-2">{children}</div>}
    </div>
  );
};

export default Query;
