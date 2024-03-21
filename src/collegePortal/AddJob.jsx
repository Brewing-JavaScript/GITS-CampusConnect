import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../Api/Api";
import "./Addjob.css";

const hardcodedSkills = [
  "javaScript",
  "react",
  "node.js",
  "html-css",
  "tailwind-css",
];
const branchOptions = [
  "computer-science",
  "information-technology",
  "mechanical",
  "civil",
  "all",
];

const AddJob = () => {
  const [formData, setFormData] = useState({
    cname: "",
    jobRole: "",
    logoUrl: "",
    eligibility: "",
    applicationDeadline: "",
    companyVisitDate: "",
    description: "",
    branches: [],
    skills: [],
  });

  const [companyNames, setCompanyNames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyNames = async () => {
      try {
        const response = await api.get("/all-company-names");
        setCompanyNames(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching company names:", error.message);
        toast.error("Failed to fetch company names");
      }
    };

    fetchCompanyNames();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "branches" || name === "skills") {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData({ ...formData, [name]: selectedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Adding company...");

    console.log(formData);

    try {
      const response = await api.post("/add-company", formData);
      if (response.data) {
        toast.success("Company added successfully");
        setFormData({
          cname: "",
          jobRole: "",
          logoUrl: "",
          eligibility: "",
          applicationDeadline: "",
          companyVisitDate: "",
          description: "",
          branches: [],
          skills: [],
        });
      }
    } catch (error) {
      console.error("Error adding company:", error.message);
      toast.error(error.response?.data?.error || "Failed to add company");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    // <div className="max-w-4xl mr-20 h-auto p-8 mx-auto border bg-slate-100 shadow-md rounded-md">
    //   <h2 className="text-5xl font-mullish font-bold text-center">Add Job</h2>
    //   <form onSubmit={handleSubmit} className="w-full h-auto flex justify-center items-center space-x-20 mt-8">
    //     <div className="flex flex-col gap-6">
    //       <div>
    //         <label htmlFor="cname" className="block font-semibold">
    //           Company Name
    //         </label>
    //         <select
    //           id="cname"
    //           name="cname"
    //           value={formData.cname}
    //           onChange={handleChange}
    //           className="border border-black-500 px-3 py-2 w-full rounded-md"
    //         >
    //           {loading ? (
    //             <option value="" disabled>
    //               Loading...
    //             </option>
    //           ) : (
    //             <>
    //               <option value="" disabled>
    //                 Select Company Name
    //               </option>
    //               {companyNames.map((companyName) => (
    //                 <option key={companyName} value={companyName}>
    //                   {companyName}
    //                 </option>
    //               ))}
    //             </>
    //           )}
    //         </select>
    //       </div>
    //       <div>
    //         <label htmlFor="jobRole" className="block font-semibold">
    //           Job Role
    //         </label>
    //         <input
    //           type="text"
    //           id="jobRole"
    //           name="jobRole"
    //           value={formData.jobRole}
    //           onChange={handleChange}
    //           className="border border-black-500 px-3 py-2 w-full rounded-md"
    //           required
    //         />
    //       </div>
    //       <div>
    // <label htmlFor="logoUrl" className="block font-semibold">
    //   Logo URL
    // </label>
    // <input
    //   type="text"
    //   id="logoUrl"
    //   name="logoUrl"
    //   value={formData.logoUrl}
    //   onChange={handleChange}
    //   className="border border-black-500 px-3 py-2 w-full rounded-md"
    //   required
    // />
    //       </div>
    //       <div>
    // <label htmlFor="eligibility" className="block font-semibold">
    //   Eligibility
    // </label>
    // <input
    //   type="text"
    //   id="eligibility"
    //   name="eligibility"
    //   value={formData.eligibility}
    //   onChange={handleChange}
    //   className="border border-black-500 px-3 py-2 w-full rounded-md"
    //   required
    // />
    //       </div>
    //       <div>
    //         <label htmlFor="branches" className="block font-semibold">
    //           Branches (select multiple)
    //         </label>
    //         <select
    //           multiple
    //           id="branches"
    //           name="branches"
    //           value={formData.branches}
    //           onChange={handleChange}
    //           className="border border-black-500 px-3 py-2 w-full rounded-md"
    //         >
    //           {branchOptions.map((branch) => (
    //             <option key={branch} value={branch}>{branch}</option>
    //           ))}
    //         </select>
    //       </div>
    //       <div>
    //         <label htmlFor="skills" className="block font-semibold">
    //           Skills (select multiple)
    //         </label>
    //         <select
    //           multiple
    //           id="skills"
    //           name="skills"
    //           value={formData.skills}
    //           onChange={handleChange}
    //           className="border border-black-500 px-3 py-2 w-full rounded-md"
    //         >
    //           {hardcodedSkills.map((skill) => (
    //             <option key={skill} value={skill}>{skill}</option>
    //           ))}
    //         </select>
    //       </div>
    //     </div>
    //     <div className="flex flex-col gap-8">
    //       <div>
    //         <label htmlFor="description" className="block font-semibold">
    //           Description
    //         </label>
    //         <textarea
    //           id="description"
    //           name="description"
    //           value={formData.description}
    //           onChange={handleChange}
    //           className="border border-black-500 w-full h-10 rounded-md"
    //           required
    //         />
    //       </div>
    //       <div>
    // <label htmlFor="applicationDeadline" className="block font-semibold">
    //   Application Deadline
    // </label>
    // <input
    //   type="date"
    //   id="applicationDeadline"
    //   name="applicationDeadline"
    //   value={formData.applicationDeadline}
    //   onChange={handleChange}
    //   className="border border-black-500 px-3 py-2 w-full rounded-md"
    //   required
    // />
    //       </div>
    //       <div>
    //         <label htmlFor="companyVisitDate" className="block font-semibold">
    //           Company Visit Date
    //         </label>
    //         <input
    //           type="date"
    //           id="companyVisitDate"
    //           name="companyVisitDate"
    //           value={formData.companyVisitDate}
    //           onChange={handleChange}
    //           className="border border-black-500 px-3 py-2 w-full rounded-md"
    //           required
    //         />
    //       </div>
    //       <button
    //         type="submit"
    //         className="bg-blue-500 text-white font-mullish font-bold px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
    //         >
    //           Submit
    //         </button>
    //       </div>
    //     </form>
    //   </div>

    <div className="  max-w-3xl mr-40 mt-20 h-auto p-8 mx-auto border  bg-[#eceff180] shadow-2xl shadow-slate-500 rounded-xl ">
      <h2 className="text-5xl font-mullish font-bold text-center">Add Job</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full h-auto flex justify-center items-center space-x-20 mt-8"
        autoComplete="off"
      >
        <div className="flex  w-full gap-6">
          <div className="w-full md:w-1/2">
            <div className="flex flex-col gap-6">
              <div>
                <label htmlFor="cname" className="block font-semibold">
                  Company Name
                </label>
                <select
                  id="cname"
                  name="cname"
                  value={formData.cname}
                  onChange={handleChange}
                  autoComplete="off"
                  className="border border-black-700 px-3 py-2 w-full rounded-md focus:border-red-500  cursor-pointer "
                >
                  {loading ? (
                    <option value="" disabled>
                      Loading...
                    </option>
                  ) : (
                    <>
                      <option value="" disabled>
                        Select Company Name
                      </option>
                      {companyNames.map((companyName) => (
                        <option key={companyName} value={companyName}>
                          {companyName}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
              <div>
                <label htmlFor="jobRole" className="block font-semibold">
                  Job Role
                </label>
                <input
                  type="text"
                  id="jobRole"
                  name="jobRole"
                  value={formData.jobRole}
                  onChange={handleChange}
                  autoComplete="off"
                  className="border border-black-500 px-3 py-2 w-full rounded-md focus:border-red-500 cursor-pointer "
                  required
                />
              </div>
              <div>
                <label htmlFor="logoUrl" className="block font-semibold">
                  Logo URL
                </label>
                <input
                  type="text"
                  id="logoUrl"
                  name="logoUrl"
                  value={formData.logoUrl}
                  onChange={handleChange}
                  className="border border-black-500 px-3 py-2 w-full rounded-md focus:border-red-500 cursor-pointer "
                  required
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="eligibility" className="block font-semibold">
                  Eligibility
                </label>
                <input
                  type="text"
                  id="eligibility"
                  name="eligibility"
                  value={formData.eligibility}
                  onChange={handleChange}
                  className="border border-black-500 px-3 py-2 w-full rounded-md focus:border-red-500 cursor-pointer"
                  required
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="branches" className="block font-semibold">
                  Branches (select multiple)
                </label>
                <select
                  multiple
                  id="branches"
                  name="branches"
                  value={formData.branches}
                  onChange={handleChange}
                  className="border border-black-500 px-3 py-2 w-full rounded-md h-[8rem] focus:border-red-500 cursor-pointer"
                  autoComplete="off"
                >
                  {branchOptions.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex flex-col gap-6">
              <div>
                <label htmlFor="skills" className="block font-semibold">
                  Skills (select multiple)
                </label>
                <select
                  multiple
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="border border-black-500 px-3 py-2 w-full h-[8rem] rounded-md focus:border-red-500 cursor-pointer"
                  autoComplete="off"
                >
                  {hardcodedSkills.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="description" className="block font-semibold">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border border-black-500 w-full h-10 rounded-md focus:border-red-500 cursor-pointer"
                  required
                  autoComplete="off"
                />
              </div>
              <div>
                <label
                  htmlFor="applicationDeadline"
                  className="block font-semibold"
                >
                  Application Deadline
                </label>
                <input
                  type="date"
                  id="applicationDeadline"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className="border border-black-500 px-3 py-2 w-full rounded-md focus:border-red-500 cursor-pointer"
                  required
                  autoComplete="off"
                />
              </div>
              <div>
                <label
                  htmlFor="companyVisitDate"
                  className="block font-semibold"
                >
                  Company Visit Date
                </label>
                <input
                  type="date"
                  id="companyVisitDate"
                  name="companyVisitDate"
                  value={formData.companyVisitDate}
                  onChange={handleChange}
                  className="border border-black-500 px-3 py-2 w-full rounded-md focus:border-red-500 cursor-pointer"
                  required
                  autoComplete="off"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className=" text-white font-mullish font-bold px-8 py-2  mt-5 rounded-md hover:bg-slate-600 transition duration-200"
                  style={{ backgroundColor: "rgba(31,31,31)" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
