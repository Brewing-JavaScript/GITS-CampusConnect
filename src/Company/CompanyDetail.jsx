import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/Api";
import toast from "react-hot-toast";
import Checklist from "./checklist.png";

const CompanyPage = () => {
  const [company, setCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const { name } = useParams();
  const [state, setState] = useState('')

  useEffect(() => {

    const user = sessionStorage.getItem('status')
    const status = JSON.parse(user)
    setState(status)
    const fetchCompany = async () => {
      try {
        const response = await api.post("/company-by-id", { _id: id });
        setCompany(response.data);
      } catch (error) {
        console.error("Error fetching company:", error.message);
      }
    };

    fetchCompany();
  }, [id]);

  const apply = (jobRole) => {
    const user = sessionStorage.getItem("access_token");
    const token = JSON.parse(user);
    const loading = toast.loading("Loading...");
    api
      .post(
        "/apply",
        { companyId: id, name, jobRole },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        toast.dismiss(loading);
        setShowModal(true); // Show the modal after successful application
        return toast.success("Applied successfully");
      })
      .catch((err) => {
        toast.dismiss(loading);
        return toast.error(err.response.data.error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {company ? (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-center mb-4"> {/* Added flex properties here */}
            <h3 className="text-3xl text-black-600 font-bold mr-2"> {/* Added margin-right */}
              {company.cname}
            </h3>
            <img className="w-6 h-6 rounded-full" src={Checklist} alt="Checklist Icon" /> {/* Added alt attribute */}
          </div>
          {company.jobRole.map((jobRole, index) => (
            <div
              key={index}
              className="mb-4 flex justify-between items-center border-b border-gray-300 pb-4"
            >
              <p className="text-lg font-semibold mb-1">{jobRole}</p>
              {
                state === "student" ? <button
                  onClick={() => {
                    apply(jobRole);
                  }}
                  className="btn text-blue-500 hover:underline"
                >
                  Apply For Job
                </button> : ""
              }
            </div>
          ))}
          <div className="mt-4">
            <p className="text-lg font-semibold mb-2">COMPANY DETAILS</p>
            <p className="mb-2">
              <span className="font-semibold">Eligibility:</span>{" "}
              {company.eligibility}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Application Deadline:</span>{" "}
              {new Date(company.applicationDeadline).toLocaleDateString()}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Company Visit Date:</span>{" "}
              {new Date(company.companyVisitDate).toLocaleDateString()}
            </p>
            {/* You may display other fields here */}
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
              Join our WhatsApp group!
            </h2>
            <p className="mb-4">Join our WhatsApp group to stay updated:</p>
            <a
              href="https://chat.whatsapp.com/ISNoOOQmy7yJcnpMToDDHk"
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            >
              Join WhatsApp Group
            </a>
            <button
              onClick={() => setShowModal(false)}
              className="btn bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded ml-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
