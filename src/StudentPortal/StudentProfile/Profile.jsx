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

  const [user, setUser] = useState(null)

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

      <div style={{marginLeft: "22rem", paddingTop: "2rem"}}>
        <div className="container mx-auto" style={{height: "auto"}}>
          <form style={{display: "flex", width: "100%"}} onSubmit={handleSubmit} className=" mx-auto">

            <div className="left" style={{marginRight: "3rem"}}>
              <div className="flex">
                <input
                  onChange={getImage}
                  type="file"
                  id="upload_banner"
                  accept=".jpeg, .png , .jpg"
                  className="hidden"
                />
                <label htmlFor="upload_banner">
                  <img style={{width:"15rem", height: "15rem"}}
                    src={info.avatar ? URL.createObjectURL(info.avatar) : "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG-Free-Image.png"}
                    alt="Avatar"
                    className="w-32 h-32 bg-gray-300 rounded-full cursor-pointer"
                  />
                </label>
              </div>

              <div className="flex justify-center mt-4">
                <button style={{padding: '1rem 2rem'}}
                  onClick={handleUploadClick}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Upload Resume
                </button>
              </div>
            </div>

            <div className="right" style={{width: "50%"}}>
            <h2 className="mb-4 text-4xl font-bold leadiF sm:text-5xl">
              Personal Information
            </h2>

              <textarea
                onChange={handleChange}
                name="heading"
                type="text"
                value={info.heading}
                className="border rounded py-2 px-3 mb-2 w-full"
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

              <div className="skillsAndExperiences flex">
                <div className="section-skills mb-2" style={{marginRight: "5rem"}}>
                  <h2 className="mb-4 mt-4 text-4xl font-bold leadiF sm:text-5xl">
                    Skills
                  </h2>
                  <select
                    // multiple
                    value={info.selectedSkills}
                    onChange={handleSkillsChange}
                    className="border rounded"
                  >

                    {hardcodedSkills.map((skill, index) => (
                      <option key={index} value={skill}>{skill}</option>
                    ))}
                  </select>
                  <div className="mb-4 mt-4">
                    {info.skills.map((skill, index) => (
                      <span
                      style={{padding: "0.5rem 1rem"}}
                        key={index}
                        className="bg-gray-200 text-gray-700 py-1 px-2 rounded-full mb-2 block"
                      >
                        {skill}
                        <button
                        style={{padding: " 0 0", marginLeft: "5px"}}
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className=" focus:outline-none"
                        >
                          &#10005;
                        </button>
                      </span>
                    ))}
                  </div>


                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                  >
                    Add Skills
                  </button>
                </div>

                <div className="section-exp" style={{width: "100%"}}>
                  <h2 className="mb-4 mt-4 text-4xl font-bold leadiF sm:text-5xl">
                    Experiences
                  </h2>

                  
                

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

                </div> {/* Experience */}

              </div> {/* skillsAndExperiences */}

            </div>

          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
