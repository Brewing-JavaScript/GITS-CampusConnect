// import React from 'react'
// import './resources.css'
// import Navbar from '../Navbar/Navbar'

// export default function Resources() {
//     const interviewQuestions = [
//         "What is the time complexity of binary search algorithm?",
//         "Explain the concept of dynamic programming.",
//         "What are the different types of data structures?",
//         "How does a hash table work?",
//         "What is the difference between BFS and DFS?",
//         "Explain the concept of Big O notation.",
//         "What are the sorting algorithms you are familiar with?",
//         "How do you handle collisions in hashing?",
//         "What are the differences between arrays and linked lists?",
//         "Explain the working of a priority queue."
//     ];

//     return (

//         <>
//             <Navbar />


//             <div className="p-4 sm:ml-64">
//                 <div className="container mx-auto py-8">
//                     <h1 className="text-3xl font-bold mb-4">Project Resources</h1>
//                     <div className="flex">
//                         {/* Resource Cards */}
//                         <ResourceCard
//                             title="Project Plan"
//                             description="View the detailed project plan outlining tasks and timelines."
//                             link="/project-plan"
//                         />
//                         <ResourceCard
//                             title="Design Documents"
//                             description="Access design documents for the project architecture and UI/UX."
//                             link="/design-documents"
//                         />
//                         <ResourceCard
//                             title="Meeting Notes"
//                             description="Review meeting notes from team meetings and client discussions."
//                             link="/meeting-notes"
//                         />
//                         {/* Add more resource cards as needed */}
//                     </div>
//                 </div>
//                 <div className="flex" >
//                     <div class="me-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 videoCards">
//                         <a href="#">
//                             <img class="rounded-t-lg" src="https://images.unsplash.com/photo-1707343848873-d6a834b5f9b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
//                         </a>
//                         <div class="p-5">
//                             <a href="#">
//                                 <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
//                             </a>
//                             <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
//                             <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                                 Read more
//                                 <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
//                                 </svg>
//                             </a>
//                         </div>
//                     </div>
//                     <div class="me-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 videoCards">
//                         <a href="#">
//                             <img class="rounded-t-lg" src="https://images.unsplash.com/photo-1707343848873-d6a834b5f9b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
//                         </a>
//                         <div class="p-5">
//                             <a href="#">
//                                 <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
//                             </a>
//                             <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
//                             <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                                 Read more
//                                 <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
//                                 </svg>
//                             </a>
//                         </div>
//                     </div>


//                     <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 videoCards">
//                         <a href="#">
//                             <img class="rounded-t-lg" src="https://images.unsplash.com/photo-1707343848873-d6a834b5f9b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
//                         </a>
//                         <div class="p-5">
//                             <a href="#">
//                                 <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
//                             </a>
//                             <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
//                             <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                                 Read more
//                                 <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
//                                 </svg>
//                             </a>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="container mx-auto px-4 py-8">
//                     <h1 className="text-3xl font-bold mb-4">Top 10 Interview Questions</h1>
//                     <ol className="list-decimal pl-6">
//                         {interviewQuestions.map((question, index) => (
//                             <li key={index} className="text-lg mb-4 bg-white shadow-md rounded-lg p-4">
//                                 <p>{question}</p>
//                             </li>
//                         ))}
//                     </ol>
//                 </div>
//             </div>

//         </>

//     )
// }

// const ResourceCard = ({ title, description, link }) => {
//     return (
//         <a href={link} className="me-10 bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 max-w-sm">
//             <h2 className="text-xl font-semibold mb-2">{title}</h2>
//             <p className="text-gray-600">{description}</p>
//         </a>
//     );
// };

// second code

// import React, { useState } from 'react';
// import Navbar from '../Navbar/Navbar';
// import Rating from '../Rating/Rating'; // Assuming Rating is in the same directory

// const Resources = () => {
//     const [showRating, setShowRating] = useState(false);

//     const interviewQuestions = [
//         "What is the time complexity of binary search algorithm?",
//         "Explain the concept of dynamic programming.",
//         // ... (other interview questions)
//     ];

//     const handleReviewClick = () => {
//         setShowRating(true);
//     };

//     return (
//         <>
//             <Navbar />

//             <div className="p-4 sm:ml-64">
//                 {/* ... existing code ... */}
//                 <div className="flex">
//                     <ResourceCard
//                         title="Project Plan"
//                         description="View the detailed project plan outlining tasks and timelines."
//                         link="/project-plan"
//                         review={handleReviewClick} // Pass the function to handle the review click
//                     />
//                     <ResourceCard
//                         title="Design Documents"
//                         description="Access design documents for the project architecture and UI/UX."
//                         link="/design-documents"
//                     />
//                     <ResourceCard
//                         title="Meeting Notes"
//                         description="Review meeting notes from team meetings and client discussions."
//                         link="/meeting-notes"
//                     />
//                 </div>

//                 {/* Conditionally render the Rating component */}
//                 {showRating && <Rating />}

//                 <div className="container mx-auto px-4 py-8">
//                     <h1 className="text-3xl font-bold mb-4">Top 10 Interview Questions</h1>
//                     <ol className="list-decimal pl-6">
//                         {interviewQuestions.map((question, index) => (
//                             <li key={index} className="text-lg mb-4 bg-white shadow-md rounded-lg p-4">
//                                 <p>{question}</p>
//                             </li>
//                         ))}
//                     </ol>
//                 </div>
//             </div>
//         </>
//     );
// };

// const ResourceCard = ({ title, description, link, review }) => {
//     return (
//         <div className="me-10 bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 max-w-sm">
//             <h2 className="text-xl font-semibold mb-2">{title}</h2>
//             <p className="text-gray-600">{description}</p>
//             <button onClick={review} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
//                 Review
//             </button>
//         </div>
//     );
// };

// export default Resources;


// third code
import React, { useState } from 'react';
import './resources.css';
import Navbar from '../Navbar/Navbar';
import Rating from '../Rating/Rating';
import { Link } from 'react-router-dom';

export default function Resources() {
    const [selectedBranch, setSelectedBranch] = useState('');
    const [resources, setResources] = useState([]);

    const handleBranchChange = (e) => {
        setSelectedBranch(e.target.value);
        // Filter resources based on the selected branch
        const filteredResources = allResources.filter(resource => resource.branch === e.target.value);
        setResources(filteredResources);
    };

    const allResources = [
        {
            branch: 'Computer',
            title: 'Python Resources',
            description: 'View the detailed notes, outlining tasks and timelines.',
            link: 'https://docs.google.com/document/d/1bAEG4hx7SPz9Q_41_zT80GrDFQ3tqYy3oCOQnKYLCKo/edit',
            imgUrl: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/267_Python_logo-1024.png'
        },
        {
            branch: 'Computer',
            title: 'Java Resources',
            description: 'View the detailed notes, outlining tasks and timelines.',
            link: 'https://docs.google.com/document/d/1bAEG4hx7SPz9Q_41_zT80GrDFQ3tqYy3oCOQnKYLCKo/edit',
            imgUrl: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/181_Java_logo_logos-1024.png'
        },
        {
            branch: 'Computer',
            title: 'Web Development Resources',
            description: 'View the detailed notes, outlining tasks and timelines.',
            link: 'https://docs.google.com/document/d/1bAEG4hx7SPz9Q_41_zT80GrDFQ3tqYy3oCOQnKYLCKo/edit',
            imgUrl: 'https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Html-1024.png'
        },
        {
            branch: 'Computer',
            title: 'Python Resources',
            description: 'View the detailed notes, outlining tasks and timelines.',
            link: 'https://docs.google.com/document/d/1bAEG4hx7SPz9Q_41_zT80GrDFQ3tqYy3oCOQnKYLCKo/edit',
            imgUrl: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/267_Python_logo-1024.png'
        },
        {
            branch: 'Computer',
            title: 'Java Resources',
            description: 'View the detailed notes, outlining tasks and timelines.',
            link: 'https://docs.google.com/document/d/1bAEG4hx7SPz9Q_41_zT80GrDFQ3tqYy3oCOQnKYLCKo/edit',
            imgUrl: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/181_Java_logo_logos-1024.png'
        },
        {
            branch: 'Computer',
            title: 'Web Development Resources',
            description: 'View the detailed notes, outlining tasks and timelines.',
            link: 'https://docs.google.com/document/d/1bAEG4hx7SPz9Q_41_zT80GrDFQ3tqYy3oCOQnKYLCKo/edit',
            imgUrl: 'https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Html-1024.png'
        },
        {
            branch: 'IT',
            title: 'Android Development Resources',
            description: 'View the detailed notes, outlining tasks and timelines.',
            link: 'https://docs.google.com/document/d/1bAEG4hx7SPz9Q_41_zT80GrDFQ3tqYy3oCOQnKYLCKo/edit',
            imgUrl: 'https://cdn0.iconfinder.com/data/icons/social-media-2183/512/social__media__social_media__android_-1024.png'
        },
        {
            branch: 'IT',
            title: 'Blockchain Resources',
            description: 'View the detailed notes, outlining tasks and timelines.',
            link: 'https://docs.google.com/document/d/1bAEG4hx7SPz9Q_41_zT80GrDFQ3tqYy3oCOQnKYLCKo/edit',
            imgUrl: 'https://cdn0.iconfinder.com/data/icons/logos-21/40/Bitcoin-1024.png'
        },
        {
            branch: 'IT',
            title: 'Machine Learning Resources',
            description: 'View the detailed notes, outlining tasks and timelines.',
            link: 'https://docs.google.com/document/d/1bAEG4hx7SPz9Q_41_zT80GrDFQ3tqYy3oCOQnKYLCKo/edit',
            imgUrl: 'https://cdn4.iconfinder.com/data/icons/general-office/91/General_Office_57-1024.png'
        },
        {
            branch: 'Civil',
            title: 'Construction Management Resources',
            description: 'View the detailed notes, outlining tasks and timelines.',
            link: 'https://docs.google.com/document/d/1bAEG4hx7SPz9Q_41_zT80GrDFQ3tqYy3oCOQnKYLCKo/edit',
            imgUrl: 'https://cdn0.iconfinder.com/data/icons/construction-2-21/512/construction-industry-building-44-1024.png'
        },
        {
            branch: 'Civil',
            title: 'Transportation Engineering Resources',
            description: 'View the detailed notes, outlining tasks and timelines.',
            link: 'https://docs.google.com/document/d/1bAEG4hx7SPz9Q_41_zT80GrDFQ3tqYy3oCOQnKYLCKo/edit',
            imgUrl: 'https://cdn0.iconfinder.com/data/icons/isometric-city-basic-transport/64/truck-front-02-1024.png'
        },
        {
            branch: 'Civil',
            title: 'Environmental Engineering Resources',
            description: 'View the detailed notes, outlining tasks and timelines.',
            link: 'https://docs.google.com/document/d/1bAEG4hx7SPz9Q_41_zT80GrDFQ3tqYy3oCOQnKYLCKo/edit',
            imgUrl: 'https://cdn2.iconfinder.com/data/icons/free-version/128/recycling-1024.png'
        },
        {
            branch: 'Mechanical',
            title: 'Fluid Mechanics Resources',
            description: 'View the detailed notes, outlining tasks and timelines.',
            link: 'https://docs.google.com/document/d/1bAEG4hx7SPz9Q_41_zT80GrDFQ3tqYy3oCOQnKYLCKo/edit',
            imgUrl: 'https://cdn4.iconfinder.com/data/icons/fluent-solid-20px-vol-3/20/ic_fluent_fluid_20_filled-1024.png'
        },
        {
            branch: 'Mechanical',
            title: 'Thermodynamics Resources',
            description: 'View the detailed notes, outlining tasks and timelines.',
            link: 'https://docs.google.com/document/d/1bAEG4hx7SPz9Q_41_zT80GrDFQ3tqYy3oCOQnKYLCKo/edit',
            imgUrl: 'https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Sun-1024.png'
        },
    ];

    return (
        <>
            <Navbar bgColor="resources"/>
            <div className="container resource" style={{ maxWidth: "80%", marginLeft: "16rem", paddingTop: "2rem"}} >
                <div className="container resource" style={{}}>
                    <h2 className="text-4xl font-bold leadiF sm:text-5xl" style={{ paddingLeft: "1rem" }}>Project Resources</h2>
                    <div className="flex p-6">
                        <select className="form-select mb-4" value={selectedBranch} onChange={handleBranchChange}>
                            <option value="">Select Branch</option>
                            <option value="Computer">Computer</option>
                            <option value="IT">IT</option>
                            <option value="Civil">Civil</option>
                            <option value="Mechanical">Mechanical</option>
                            {/* Add more branches */}
                        </select>
                    </div>
                    <div className="flex flex-wrap">
                        {/* Render resources based on selected branch */}
                        {resources.map((resource, index) => (
                            <Link key={index} target='_blank' to={resource.link}>
                                <ResourceCard
                                    title={resource.title}
                                    description={resource.description}
                                    imgUrl={resource.imgUrl}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

const ResourceCard = ({ title, description, imgUrl }) => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 w-80 m-2">
            <img src={imgUrl} alt="" className="w-full h-48 object-cover mb-4"/>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};
