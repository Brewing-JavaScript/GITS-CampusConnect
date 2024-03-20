import React, { useEffect, useState } from "react";
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

  const [user, setUser] = useState()

  useEffect(() => {

    const id = sessionStorage.getItem('_id')
    const _id = JSON.parse(id)
    try {
      api.post('/get-user-by-id', { _id }).then((res) => {
        setUser(res.data)
      }).catch(err => {
        console.log(err.message);
      })

    } catch (error) {
      console.log(error.message);
    }
  }, [])

  const [editOn, setEditOn] = useState(true);

  const handleEditClick = () => {
    setEditOn(!editOn);
  };

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

      <div className="p-4 sm:ml-64">
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
      </div>

    
    </>
  );
}

export default Profile;

