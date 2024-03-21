import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../Api/Api';
import { useNavigate } from 'react-router-dom';

const CompanyHomePage = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState([]);
  const [selectedResumeUrl, setSelectedResumeUrl] = useState(null);
  const [statusChanged, setStatusChanged] = useState(false); // Track status change
  const [showPopup, setShowPopup] = useState(false);
  const [topApplicants, setTopApplicants] = useState([]);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    const name = sessionStorage.getItem('name');

    if (!name) return;

    const parsedName = JSON.parse(name);
    const loading = toast.success('Loading...');

    api.post('/get-all-user-job', {
      name: parsedName,
    })
      .then((res) => {
        toast.dismiss(loading);
        setData(res.data);
      })
      .catch((err) => {
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
    api
      .post('/change-status', { userId })
      .then((res) => {
        toast.dismiss(loading);
        toast.success('Hired');
        setStatusChanged((prev) => !prev); // Toggle statusChanged to trigger useEffect
      })
      .catch((err) => {
        toast.dismiss(loading);
        console.log(err.message);
      });
  };

  const navigate = useNavigate();

  const handleCall = (email) => {
    navigate(`/company-call/${email}`);
  };

  const getTopApplicants = (_id) => {
    try {
      api
        .post('/get-top-st', { _id })
        .then((res) => {
          setTopApplicants(res.data);
          togglePopup(); // Open the popup
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {showPopup && (
        <div className="fixed p-12 top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
          <div className="bg-white rounded-lg p-8 max-w-md relative">
            <button
              onClick={togglePopup}
              className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-semibold mb-4">Top Applicants</h2>
            <ul>
              {topApplicants.map((applicant) => (
                <div className='w-full flex items-center gap-4 space-y-2'>
                  <li key={applicant._id}>{applicant.username}</li>
                  <li key={applicant._id}>{applicant.email}</li></div>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="flex">
          <nav className={`w-1/6 bg-gray-800 text-white ${isOpen ? '' : 'hidden'}`}>
            <div className="p-4">
              <button onClick={() => setCurrentSection('home')} className={`block w-full py-2 px-4 mb-2 bg-gray-900 hover:bg-gray-700 rounded-lg ${currentSection === 'home' ? 'bg-gray-700' : ''}`}>Home</button>
              {/* <button onClick={() => setCurrentSection('hired')} className={`block w-full py-2 px-4 mb-2 bg-gray-900 hover:bg-gray-700 rounded-lg ${currentSection === 'hired' ? 'bg-gray-700' : ''}`}>Hired</button> */}
            </div>
          </nav>
          <div className="w-3/4 p-6">
            <button onClick={toggleNavbar} className="block mb-4 bg-gray-900 text-white py-2 px-4 rounded">
              {isOpen ? 'Close' : 'Open'}
            </button>
            <h1 className="text-3xl font-semibold mb-6">Applicants</h1>

            {data.map(applicant => (
              <div key={applicant._id} className="bg-white rounded-lg shadow-md mb-6 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{applicant.cname}</h2>
                    <p>Eligibility: {applicant.eligibility}</p>
                    <p>Application Deadline: {new Date(applicant.applicationDeadline).toLocaleDateString()}</p>
                    <p>Company Visit Date: {new Date(applicant.companyVisitDate).toLocaleDateString()}</p>
                    <div onClick={() => { getTopApplicants(applicant._id); setSelectedApplicantId(applicant._id); }} className='btn m-4 cursor-pointer '>Get Top Applicants</div>
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
                    {applicant.userIds.map(user => (<tr key={user.userId._id} className="bg-white dark:bg-gray-800">
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
                        <button onClick={() => changeStatus(user.userId._id)} className={"font-medium " + (user.userId.hired ? "text-green-400" : "text-red-500")}>{user.userId.hired ? "Hired" : "Pending"}</button>
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
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute w-full h-full cursor-pointer bg-gray-900 bg-opacity-75" onClick={closeResumeModal}></div>
          <div className="flex items-center justify-center w-full h-full">
            <div className="bg-white rounded-lg cursor-pointer p-8 max-w-md relative">
              <button onClick={closeResumeModal} className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <iframe title="Resume" src={selectedResumeUrl} className="w-screen h-[80%]" style={{ minHeight: '400px' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyHomePage;

