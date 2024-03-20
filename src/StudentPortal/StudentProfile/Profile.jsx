import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import toast from "react-hot-toast";
import api from "../../Api/Api";

const hardcodedSkills = ["javaScript", "react", "node-js", "html-css", "tailwind-css"];
const branchOptions = ["computer-science", "information-technology", "mechanical", "civil"];

function Profile() {
  const [info, setInfo] = useState({
    avatar: "",
    heading: "",
    branch: "",
    selectedSkills: [],
    skills: [],
    experiences: [
      { company: "", role: "", duration: "" }, // Initial empty experience object
    ],
  });

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const getImage = (event) => {
    event.preventDefault();
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setInfo({
        ...info,
        avatar: uploadedImage,
      });
    }
  };

  const handleUploadClick = () => {
    document.getElementById("upload_banner").click();
  };

  const handleSkillsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setInfo({ ...info, selectedSkills: selectedOptions });
  };

  const handleAddSkill = () => {
    const { selectedSkills, skills } = info;
    if (selectedSkills.length > 0) {
      setInfo({
        ...info,
        selectedSkills: [],
        skills: [...skills, ...selectedSkills],
      });
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = info.skills.filter(skill => skill !== skillToRemove);
    setInfo({ ...info, skills: updatedSkills });
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperiences = [...info.experiences];
    updatedExperiences[index][name] = value;
    setInfo({ ...info, experiences: updatedExperiences });
  };

  const handleAddExperience = () => {
    setInfo({
      ...info,
      experiences: [
        ...info.experiences,
        { company: "", role: "", duration: "" }, // Add new empty experience object
      ],
    });
  };


  const handleRemoveExperience = (index) => {
    const updatedExperiences = [...info.experiences];
    updatedExperiences.splice(index, 1);
    setInfo({ ...info, experiences: updatedExperiences });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const user = sessionStorage.getItem('_id')
    const _id = JSON.parse(user)
    const loading = toast.loading("Please wait...");

    try {
      const formData = new FormData();
      formData.append("avatar", info.avatar);
      formData.append("heading", info.heading);
      formData.append("_id", _id);
      formData.append("branch", info.branch);
      formData.append("skills", JSON.stringify(info.skills));
      formData.append(
        "experiences",
        JSON.stringify(info.experiences) // Ensure experiences array is correctly formatted
      );


      const response = await api.post("/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.dismiss(loading);
      toast.success(response.data.message);
      setInfo({
        avatar: "",
        heading: "",
        branch: "",
        selectedSkills: [],
        skills: [],
        experiences: [],
      });
    } catch (error) {
      toast.dismiss(loading);
      toast.error("An error occurred while updating profile.");
    }
  };

  return (
    <>
      <Navbar bgColor="profile" />

      {/* <div className="p-4 sm:ml-64">
        <div className="container mx-auto py-8">
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">

            <div className="flex items-center justify-center">
              <input
                onChange={getImage}
                type="file"
                id="upload_banner"
                accept=".jpeg, .png , .jpg"
                className="hidden"
              />
              <label htmlFor="upload_banner">
                <img
                  src={info.avatar ? URL.createObjectURL(info.avatar) : "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG-Free-Image.png"}
                  alt="Avatar"
                  className="w-32 h-32 bg-gray-300 rounded-full cursor-pointer"
                />
              </label>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={handleUploadClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Upload Resume
              </button>
            </div>

            <textarea
              onChange={handleChange}
              name="heading"
              type="text"
              value={info.heading}
              className="border rounded py-2 px-3 mb-2 mt-4 w-full"
              placeholder="Enter The Event Heading"
            />

            <div className="mb-2">
              <label htmlFor="branch" className="block mb-1">Select Branch:</label>
              <select
                id="branch"
                onChange={handleChange}
                name="branch"
                value={info.branch}
                className="border rounded py-2 px-3 w-full"
              >
                <option value="">Select Branch</option>
                {branchOptions.map((branch, index) => (
                  <option key={index} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center mb-2">
              <select
                multiple
                value={info.selectedSkills}
                onChange={handleSkillsChange}
                className="border rounded py-2 px-3 mr-2 w-1/2"
              >

                {hardcodedSkills.map((skill, index) => (
                  <option key={index} value={skill}>{skill}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddSkill}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Skills
              </button>
            </div>

            <div className="mb-4">
              {info.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 py-1 px-2 rounded-full mr-2 mb-2 inline-block"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 focus:outline-none"
                  >
                    &#10005;
                  </button>
                </span>
              ))}
            </div>

            {info.experiences.map((experience, index) => (
              <div key={index} className="flex flex-col mb-4">
                <input
                  type="text"
                  name="company"
                  value={experience.company}
                  onChange={(e) => handleExperienceChange(index, e)}
                  placeholder="Company"
                  className="border rounded py-2 px-3 mb-2"
                />
                <input
                  type="text"
                  name="role"
                  value={experience.role}
                  onChange={(e) => handleExperienceChange(index, e)}
                  placeholder="Role"
                  className="border rounded py-2 px-3 mb-2"
                />
                <input
                  type="text"
                  name="duration"
                  value={experience.duration}
                  onChange={(e) => handleExperienceChange(index, e)}
                  placeholder="Duration"
                  className="border rounded py-2 px-3 mb-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExperience(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full inline-block"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddExperience}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
              Add Experience
            </button>

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div> */}

      <div style={{ marginLeft: "22rem", padding: "2rem" }}>
        <h2 className="mb-8 text-4xl font-bold leadiF sm:text-5xl">Profile</h2>

        <section className="flex" style={{ backgroundColor: "white", border: "1px solid rgba(0, 0, 0, 0.19)", borderRadius: "12px" }}>
          <div style={{ padding: "2rem", backgroundColor: " #f1f1f8", width: "auto" }}>
            <div style={{ backgroundColor: "grey", width: "12rem", height: "12rem", borderRadius: "50%", marginBottom: "2rem" }}></div>
            <div  style={{width: "fit-content", margin: "0 auto" }}>
              <h1 style={{fontSize: "2rem", fontWeight: 500, marginBottom: "1rem"}}>Skills</h1>
              <h4 className="mb-1">MongoDB</h4>
              <h4 className="mb-1">Express JS</h4>
              <h4 className="mb-1">React JS</h4>
              <h4 className="mb-1">Node JS</h4>
            </div>
          </div>

          {/* <div style={{ padding: "2rem" }}>
            <h4 style={{ fontSize: "2rem" }}>Account Details</h4>


            <form class="max-w-sm mx-auto">

              <div className="mb-2">
                <label htmlFor="branch" className="block mb-1">Select Branch:</label>
                <select
                  id="branch"
                  onChange={handleChange}
                  name="branch"
                  value={info.branch}
                  className="border rounded py-2 px-3 w-full"
                >
                  <option value="">Select Branch</option>
                  {branchOptions.map((branch, index) => (
                    <option key={index} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center mb-2">
                <select
                  multiple
                  value={info.selectedSkills}
                  onChange={handleSkillsChange}
                  className="border rounded py-2 px-3 mr-2 w-1/2"
                >

                  {hardcodedSkills.map((skill, index) => (
                    <option key={index} value={skill}>{skill}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Skills
                </button>
              </div>

              <div className="mb-4">
                {info.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 py-1 px-2 rounded-full mr-2 mb-2 inline-block"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 focus:outline-none"
                    >
                      &#10005;
                    </button>
                  </span>
                ))}
              </div>

              {info.experiences.map((experience, index) => (
                <div key={index} className="flex flex-col mb-4">
                  <input
                    type="text"
                    name="company"
                    value={experience.company}
                    onChange={(e) => handleExperienceChange(index, e)}
                    placeholder="Company"
                    className="border rounded py-2 px-3 mb-2"
                  />
                  <input
                    type="text"
                    name="role"
                    value={experience.role}
                    onChange={(e) => handleExperienceChange(index, e)}
                    placeholder="Role"
                    className="border rounded py-2 px-3 mb-2"
                  />
                  <input
                    type="text"
                    name="duration"
                    value={experience.duration}
                    onChange={(e) => handleExperienceChange(index, e)}
                    placeholder="Duration"
                    className="border rounded py-2 px-3 mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExperience(index)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full inline-block"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddExperience}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
              >
                Add Experience
              </button>

              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Update Profile
              </button>


            </form>

          </div> */}

          <div>
          <div style={{padding: "1rem 1rem 0 1rem", width: "100%"}}>
            <h1 style={{fontSize: "2rem", marginBottom: "1rem", fontWeight: 500}}>Personal Information</h1>

            <div className="flex">
              <div className="left" style={{marginRight: "5rem"}}>
                <div className="box">
                  <h3 className="beforeDetail">First Name</h3>
                  <h3 className="afterDetail">Farhaan</h3>
                </div>
                <div className="box">
                  <h3 className="beforeDetail">Email Address</h3>
                  <h3 className="afterDetail">farhaan8d@gmail.com</h3>
                </div>
                <div className="box">
                  <h3 className="beforeDetail">Branch</h3>
                  <h3 className="afterDetail">Computer Science</h3>
                </div>
              </div>
              <div className="right">
              <div className="box">
                  <h3 className="beforeDetail">Last Name</h3>
                  <h3 className="afterDetail">Shaikh</h3>
                </div>
                <div className="box">
                  <h3 className="beforeDetail">Phone</h3>
                  <h3 className="afterDetail">7021177410</h3>
                </div>
              </div>
            </div>
          </div>

          <div style={{padding: "0 1rem 1rem 1rem", width: "100%"}}>
            <h1 style={{fontSize: "2rem", marginBottom: "1rem", fontWeight: 500}}>Experience</h1>

            <div className="grid grid-cols-3">
            <div style={{marginRight: "5rem" }} className="box">
              <h3 className="beforeDetail">Company</h3>
              <h3 className="afterDetail">ABC Company</h3>
            </div>
            <div style={{marginRight: "5rem" }} className="box">
              <h3 className="beforeDetail">Role</h3>
              <h3 className="afterDetail">Web Developer</h3>
            </div>
            <div className="box">
              <h3 className="beforeDetail">Duration</h3>
              <h3 className="afterDetail">Jan 2023 - Jan 2024</h3>
            </div>

            </div>
            <div className="grid grid-cols-3">
            <div style={{marginRight: "5rem" }} className="box">
              <h3 className="beforeDetail">Company</h3>
              <h3 className="afterDetail">DEF Company</h3>
            </div>
            <div style={{marginRight: "5rem" }} className="box">
              <h3 className="beforeDetail">Role</h3>
              <h3 className="afterDetail">SDE</h3>
            </div>
            <div className="box">
              <h3 className="beforeDetail">Duration</h3>
              <h3 className="afterDetail">Aug 2023 - Aug 2024</h3>
            </div>

            </div>
            <div className="grid grid-cols-3">
            <div style={{marginRight: "5rem" }} className="box">
              <h3 className="beforeDetail">Company</h3>
              <h3 className="afterDetail">XYZ Company</h3>
            </div>
            <div style={{marginRight: "5rem" }} className="box">
              <h3 className="beforeDetail">Role</h3>
              <h3 className="afterDetail">Android Developer</h3>
            </div>
            <div className="box">
              <h3 className="beforeDetail">Duration</h3>
              <h3 className="afterDetail">April 2023 - April 2024</h3>
            </div>
            </div>
          </div>
          </div>
        </section>


      </div>
    </>
  );
}

export default Profile;

