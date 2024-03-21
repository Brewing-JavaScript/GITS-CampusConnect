import React, { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import api from '../../Api/Api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../StudentPortal/Navbar/Navbar';

const CompanyHomePage = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState([]);
  const [selectedResumeUrl, setSelectedResumeUrl] = useState(null);
  const [statusChanged, setStatusChanged] = useState(false); // Track status change

  const handleSignOut = () => {
    sessionStorage.clear();
    return navigate("/auth");
  };

  const iframeRef = useRef(null);

  useEffect(() => {
    // Adjust the width of the iframe based on its content width
    const adjustIframeWidth = () => {
      if (iframeRef.current) {
        const contentWidth = iframeRef.current.contentWindow.document.body.scrollWidth;
        iframeRef.current.style.width = `${contentWidth}px`;
      }
    };

    // Call the adjustIframeWidth function when the iframe content is loaded
    if (iframeRef.current) {
      iframeRef.current.onload = adjustIframeWidth;
    }
  }, [selectedResumeUrl]);

  useEffect(() => {
    const name = sessionStorage.getItem('name');

    if (!name) return;

    const parsedName = JSON.parse(name);

    const loading = toast.success("Loading...");

    api.post('/get-all-user-job', {
      name: parsedName
    })
      .then((res) => {
        toast.dismiss(loading);
        setData(res.data);
      })
      .catch(err => {
        toast.dismiss(loading);
        return toast.error(err.response.data.error);
      });
  }, [statusChanged]); // Add statusChanged to dependency array

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const viewResume = (resumeUrl) => {
    setSelectedResumeUrl(resumeUrl);
  };

  const closeResumeModal = () => {
    setSelectedResumeUrl(null);
  };

  const changeStatus = (userId) => {
    const loading = toast.loading('Wait!');
    api.post('/change-status', { userId })
      .then((res) => {
        toast.dismiss(loading);
        toast.success('Hired');
        setStatusChanged(prev => !prev); // Toggle statusChanged to trigger useEffect
      })
      .catch(err => {
        toast.dismiss(loading);
        console.log(err.message);
      });
  }

  const navigate = useNavigate()

  const handleCall = (email) => {

  navigate(`/company-call/${email}`)
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        <div className="flex">
          {/* <nav className={`w-1/6 bg-gray-800 text-white ${isOpen ? '' : 'hidden'}`}>
            <div className="p-4">
              <button onClick={() => setCurrentSection('home')} className={`block w-full py-2 px-4 mb-2 bg-gray-900 hover:bg-gray-700 rounded-lg ${currentSection === 'home' ? 'bg-gray-700' : ''}`}>Home</button>
              <button onClick={() => setCurrentSection('hired')} className={`block w-full py-2 px-4 mb-2 bg-gray-900 hover:bg-gray-700 rounded-lg ${currentSection === 'hired' ? 'bg-gray-700' : ''}`}>Hired</button>
            </div>
          </nav> */}

        <aside
        style={{
          backgroundColor: "rgba(255, 255, 255, 0)",
          padding: "1.3rem",
          width: "20%",
        }}
        id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div
          style={{ border: "1px solid #00000030", borderRadius: "20px" }}
          class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800"
        >
          <h1
            style={{
              color: "black",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "1rem",
              fontSize: "1.3rem",
            }}
          >
            CampusConnect
          </h1>

          <ul class="space-y-2 font-medium">
            <li
              // style={{background: "rgb(31, 31, 31)", borderRadius: "10px"}}
              style={{
                background: "rgb(31, 31, 31)",
                borderRadius: "10px",
              }}
              className="hover:bg-gray-200"
            >
              <a
                href="/company"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>

                <span
                  style={{
                    fontSize: "1.3rem",
                    color: "white",
                  }}
                  className="ms-3"
                >
                  Home
                </span>
              </a>
            </li>

            <li
              // style={{background: "rgb(31, 31, 31)", borderRadius: "10px"}}
              style={{
                borderRadius: "10px",
              }}
              className="hover:bg-gray-200"
            >
              <a
                href="/company"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  "
              >
                  <svg
                  style={{
                    width: "1.3rem",
                    height: "1.3rem",
                  }}
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>

                <span
                  style={{
                    fontSize: "1.3rem",
                  }}
                  className="ms-3"
                >
                  Top Applicants
                </span>
              </a>
            </li>

            <li
              style={{
                borderRadius: "10px",
              }}
              className="hover:bg-gray-200"
            >
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  "
              >
                <svg
                  style={{
                    width: "1.3rem",
                    height: "1.3rem",
                  }}
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span
                  style={{
                    fontSize: "1.3rem",
                    color: "#535050",
                  }}
                  onClick={handleSignOut}
                  className="flex-1 ms-3 whitespace-nowrap"
                >
                  Sign Out
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>


          <div className="w-3/4 p-6" style={{marginLeft: "22rem"}}>
            {/* <button onClick={toggleNavbar} className="block mb-4 bg-gray-900 text-white py-2 px-4 rounded">
              {isOpen ? 'Close' : 'Open'}
            </button> */}
            <h1 className="text-3xl font-semibold mb-6">Applicants</h1>
            {data.map(applicant => (
              <div key={applicant._id} className="bg-white rounded-lg shadow-md mb-6 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{applicant.cname}</h2>
                    <p>Eligibility: {applicant.eligibility}</p>
                    <p>Application Deadline: {new Date(applicant.applicationDeadline).toLocaleDateString()}</p>
                    <p>Company Visit Date: {new Date(applicant.companyVisitDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <img src={applicant.logoUrl} alt={applicant.cname} className="w-24 h-24" />
                  </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Job Role
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Resume
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        call
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicant.userIds.map(user => (
                      <tr key={user.userId._id} className="bg-white dark:bg-gray-800">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {user.userId.username}
                        </td>
                        <td className="px-6 py-4">
                          {user.userId.email}
                        </td>
                        <td className="px-6 py-4">
                          {user.jobRole}
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => viewResume(user.userId.logourl)} className="font-medium text-white hover:underline">View</button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => changeStatus(user.userId._id)} className={"font-medium bg-[#FFE6E6] " + (user.userId.hired ? "text-green-500" : "text-red-400")}>{user.userId.hired ? "Hired" : "Pending"}</button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => handleCall(user.userId.email)} className="font-medium ">  Make a call
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedResumeUrl && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 overflow-hidden">
        <div className="absolute w-full h-full cursor-pointer bg-gray-900 bg-opacity-75" onClick={closeResumeModal}></div>
        <div className="flex items-center justify-center w-full h-full">
          <div style={{ width: '50%', maxHeight: '80vh' }} className="bg-white rounded-lg cursor-pointer p-8 relative overflow-y-auto">
            <button onClick={closeResumeModal} className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div>
                <iframe
                  title="Resume"
                  ref={iframeRef}
                  src={selectedResumeUrl}
                  className="w-full"
                  style={{ minHeight: '400px' }} // Set min height if needed
                />
            </div>
          </div>
        </div>
      </div>
      
      
      )}
    </div>
  );
};

export default CompanyHomePage;
