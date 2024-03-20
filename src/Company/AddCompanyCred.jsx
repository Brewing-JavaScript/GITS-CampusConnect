import React, { useState } from "react";
import axios from "axios";
import api from "../Api/Api";
import toast from "react-hot-toast";
import "./AddCompany.css";
import company from "./Company.png";
const RefCom = () => {
  const [formData, setFormData] = useState({
    cname: "",
    email: "",
    password: "",
    status: "company",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Making the Credentials");
    try {
      const response = await api.post("/add-compony-cred", formData);
      toast.dismiss(loading);
      setSuccessMessage("Credentials added successfully 👍 ");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="w-[70vw] h-[80vh] ml-[20%] mt-10 flex flex-col justify-end shadow-2xl shadow-slate-500 rounded-xl ">
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      {successMessage && (
        <div className="text-green-500 mb-4">{successMessage}</div>
      )}
      <div className="container w-full h-full  flex">
        <form
          onSubmit={handleSubmit}
          className="w-[50%] flex justify-center items-center"
        >
          <div className="card w-full h-[80%] flex flex-col items-center">
            <a className="login">Add Company</a>
            <div className="inputBox">
              <input
                type="text"
                name="cname"
                value={formData.cname}
                onChange={handleChange}
                required="required"
              />
              <span className="user">Add Company Name </span>
            </div>
            <div className="inputBox">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required="required"
              />
              <span className="user">Email </span>
            </div>

            <div className="inputBox">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required="required"
              />
              <span>Password</span>
            </div>

            <button className="enter" type="submit">
              Enter
            </button>
          </div>
        </form>
        <div className="college-img w-[50%] h-[80%] rounded-r-2xl overflow-hidden">
          <img
            src={company}
            className="w-full h-full object-cover"
            alt="Company"
          />
        </div>
      </div>
    </div>
  );
};

export default RefCom;
