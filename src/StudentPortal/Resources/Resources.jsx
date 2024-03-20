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
import Rating from '../Rating/Rating'; // Make sure to import the Rating component
import { Link } from 'react-router-dom';
// import { ResourceNew } from './ResourceNew';
// import { ResourceNew } from './ResourceNew';

export default function Resources() {
    const interviewQuestions = [
        "What is the time complexity of binary search algorithm?",
        "Explain the concept of dynamic programming.",
        "What are the different types of data structures?",
        "How does a hash table work?",
        "What is the difference between BFS and DFS?",
        "Explain the concept of Big O notation.",
        "What are the sorting algorithms you are familiar with?",
        "How do you handle collisions in hashing?",
        "What are the differences between arrays and linked lists?",
        "Explain the working of a priority queue."
    ];

    return (
        <>
            <Navbar />
            <div className="container sm:ml-64" style={{ maxWidth: "80%" }} >
                <div className="container" style={{}}>
                    <h2 className="text-4xl font-bold leadiF sm:text-5xl" style={{ paddingLeft: "1rem" }}>Project Resources</h2>
                    <div className="flex p-6">
                        {/* Resource Cards */}
                        <Link target='_black' to='https://docs.google.com/document/d/1bAEG4hx7SPz9Q_41_zT80GrDFQ3tqYy3oCOQnKYLCKo/edit'>
                            <ResourceCard
                                title="Python Notes"
                                description="View the detailed notes, outlining tasks and timelines."
                                link="/project-plan"
                            />
                        </Link>
                        <Link target='_blank' to="https://mu.ac.in/wp-content/uploads/2021/05/Data-Structure-Final-.pdf">
                            <ResourceCard
                                title="DSA Fundamentals"
                                description="Accessing dsa documents detail study of DS."
                                link="/design-documents"
                            />
                        </Link>
                        <Link target='_blank' to="https://enos.itcollege.ee/~jpoial/allalaadimised/reading/Advanced-java.pdf">
                        </Link>
                    </div>

                    {/* <ResourceNew/> */}
                </div>

                <div className="flex p-5" style={{ maxWidth: "80%" }}>
                    <div className=" max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ marginRight: "2rem" }}>
                        <a href="#">
                            <img className="rounded-t-lg" src="https://images.unsplash.com/photo-1707343848873-d6a834b5f9b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </a>
                        <div className="p-5">
                            <a href="https://youtu.be/DDRo29ptFwE?si=dpB3930SZGS4zrLz">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <a href="https://youtu.be/DDRo29ptFwE?si=dpB3930SZGS4zrLz" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ marginRight: "2rem" }}>
                        <a href="#">
                            <img className="rounded-t-lg" src="https://images.unsplash.com/photo-1707343848873-d6a834b5f9b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>


                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ marginRight: "2rem" }}>
                        <a href="#">
                            <img className="rounded-t-lg" src="https://images.unsplash.com/photo-1707343848873-d6a834b5f9b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>



                <section className="py-12">
                    <div className="container mx-auto" style={{ padding: "1rem" }}>
                        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Top 10 DSA Interview Questions</h2>
                        <div className="space-y-4">
                            <Accordion title="Find the Intersection Point of Two Linked Lists" color="bg-blue-50">
                                <p>Given two linked lists, find the node at which the intersection occurs. Return null if there is no intersection</p>
                            </Accordion>
                            <Accordion title="Longest Increasing Subsequence (LIS)" color="bg-white">
                                <p>Given an unsorted array of integers, find the length of the longest increasing subsequence.</p>
                            </Accordion>
                            <Accordion title="Find the Longest Common Subsequence" color="bg-blue-50">
                                <p>Given two strings, find the longest subsequence that is common to both of them.</p>
                            </Accordion>
                            <Accordion title="Depth-First Search (DFS)" color="bg-white">
                                <p>Implement depth-first search to traverse a graph and find connected components.</p>
                            </Accordion>
                            <Accordion title="Breadth-First Search (BFS)" color="bg-blue-50">
                                <p>Given an array of integers, find the contiguous subarray with the largest sum.</p>
                            </Accordion>
                            <Accordion title="Find the Maximum Subarray Sum" color="bg-white">
                                <p>Implement breadth-first search to traverse a graph and find shortest paths.</p>
                            </Accordion>
                            <Accordion title="Find the Kth Largest Element in an Array" color="bg-blue-50">
                                <p>Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.</p>
                            </Accordion>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

const Accordion = ({ title, children, color }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`border border-blue-300 rounded-lg overflow-hidden ${color} shadow-md transition duration-300 mb-4`}>
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <h3 className="text-lg font-semibold py-3 px-4">{title}</h3>
                <span className="text-blue-500 px-4">{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && (
                <div className="px-4 py-2">
                    {children}
                </div>
            )}
        </div>
    );
};

const ResourceCard = ({ title, description, link, imgUrl }) => {
    const [showRating, setShowRating] = useState(false);

    const toggleRating = () => {
        setShowRating(!showRating);
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300" style={{ marginRight: "2rem" }}>
            <img src={imgUrl} alt="" />
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600">{description}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={toggleRating}>
                Review
            </button>
            {showRating && <Rating />}
        </div>
    );
};
