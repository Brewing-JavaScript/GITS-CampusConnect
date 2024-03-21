import React from 'react';

const TopApplicantsPopup = ({ info, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute w-full h-full cursor-pointer bg-gray-900 bg-opacity-75" onClick={onClose}></div>
      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-white rounded-lg cursor-pointer p-8 max-w-md relative">
          <button onClick={onClose} className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-2xl font-semibold mb-4">Top Applicants</h2>
          <ul>
            {info.map(applicant => (
              <li key={applicant._id}>{applicant.name}</li> // Adjust this based on your data structure
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopApplicantsPopup;
