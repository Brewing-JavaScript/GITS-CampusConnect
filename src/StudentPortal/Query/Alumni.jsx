import React from 'react';
import LinkedInIcon from './components/linkedin.svg';
import TwitterIcon from './components/twitter.svg';
import InstagramIcon from './components/instagram.svg';
import Navbar from '../Navbar/Navbar';

function ContactList() {
  const contacts = [
    {
      name: 'Sneha Deshmukh',
      email: 'deshmusn@gmail.com',
      status: 'Available',
      image: 'https://res.cloudinary.com/deshcj4pb/image/upload/v1702321327/images/doctor_img/Dr.Sneha.png',
      linkedin: 'https://www.linkedin.com/in/snehaadeshmukh/',
      twitter: 'https://twitter.com/snehdeshmukh',
      instagram: 'https://www.instagram.com/sneha_deshmukh28/',
    },
    {
      name: 'Sarthak Deshmukh',
      email: 'sarthak@gmail.com',
      status: 'Unavailable',
      image: 'https://res.cloudinary.com/deshcj4pb/image/upload/v1702321325/images/doctor_img/Dr.Sarthak.jpg',
      linkedin: 'https://www.linkedin.com/bonniegreen',
      twitter: 'https://twitter.com/bonniegreen',
      instagram: 'https://www.instagram.com/bonniegreen',
    },
    {
      name: 'Karandeep Singh Sandhu',
      email: 'karandeep@gmail.com',
      status: 'Available',
      image: 'https://res.cloudinary.com/deshcj4pb/image/upload/v1702321324/images/doctor_img/Dr.Karandeep.jpg',
      linkedin: 'https://www.linkedin.com/bonniegreen',
      twitter: 'https://twitter.com/bonniegreen',
      instagram: 'https://www.instagram.com/bonniegreen',
    },
    {
      name: 'Faizan Potrick',
      email: 'faizan@gmail.com',
      status: 'Unavailable',
      image: 'https://res.cloudinary.com/deshcj4pb/image/upload/v1702321323/images/doctor_img/Dr.Faizan.jpg',
      linkedin: 'https://www.linkedin.com/bonniegreen',
      twitter: 'https://twitter.com/bonniegreen',
      instagram: 'https://www.instagram.com/bonniegreen',
    },
    {
      name: 'Aditya Rai',
      email: 'aditya@gmail.com',
      status: 'Available',
      image: 'https://res.cloudinary.com/deshcj4pb/image/upload/v1702321322/images/doctor_img/Dr.Aditya.jpg',
      linkedin: 'https://www.linkedin.com/bonniegreen',
      twitter: 'https://twitter.com/bonniegreen',
      instagram: 'https://www.instagram.com/bonniegreen',
    },
    {
      name: 'Sneha Deshmukh',
      email: 'deshmusn@gmail.com',
      status: 'Available',
      image: 'https://res.cloudinary.com/deshcj4pb/image/upload/v1702321327/images/doctor_img/Dr.Sneha.png',
      linkedin: 'https://www.linkedin.com/in/snehaadeshmukh/',
      twitter: 'https://twitter.com/snehdeshmukh',
      instagram: 'https://www.instagram.com/sneha_deshmukh28/',
    },
    {
      name: 'Sarthak Deshmukh',
      email: 'sarthak@gmail.com',
      status: 'Unavailable',
      image: 'https://res.cloudinary.com/deshcj4pb/image/upload/v1702321325/images/doctor_img/Dr.Sarthak.jpg',
      linkedin: 'https://www.linkedin.com/bonniegreen',
      twitter: 'https://twitter.com/bonniegreen',
      instagram: 'https://www.instagram.com/bonniegreen',
    },
    {
      name: 'Karandeep Singh Sandhu',
      email: 'karandeep@gmail.com',
      status: 'Available',
      image: 'https://res.cloudinary.com/deshcj4pb/image/upload/v1702321324/images/doctor_img/Dr.Karandeep.jpg',
      linkedin: 'https://www.linkedin.com/bonniegreen',
      twitter: 'https://twitter.com/bonniegreen',
      instagram: 'https://www.instagram.com/bonniegreen',
    },
    {
      name: 'Faizan Potrick',
      email: 'faizan@gmail.com',
      status: 'Unavailable',
      image: 'https://res.cloudinary.com/deshcj4pb/image/upload/v1702321323/images/doctor_img/Dr.Faizan.jpg',
      linkedin: 'https://www.linkedin.com/bonniegreen',
      twitter: 'https://twitter.com/bonniegreen',
      instagram: 'https://www.instagram.com/bonniegreen',
    },
    {
      name: 'Aditya Rai',
      email: 'aditya@gmail.com',
      status: 'Available',
      image: 'https://res.cloudinary.com/deshcj4pb/image/upload/v1702321322/images/doctor_img/Dr.Aditya.jpg',
      linkedin: 'https://www.linkedin.com/bonniegreen',
      twitter: 'https://twitter.com/bonniegreen',
      instagram: 'https://www.instagram.com/bonniegreen',
    },
  ];

  return (
    <>
    {/* <Navbar/> */}
    <div className="bg-gray-100 dark:bg-gray-800 ml-56">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="justify-center items-center min-h-screen">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">The List of Alumni's</h1>
          <ul role="list" className="w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900 shadow-md rounded-md p-6">
            {contacts.map((contact, index) => (
              <li key={index} className="py-4 sm:py-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-shrink-0">
                    <img className="w-12 h-12 rounded-full" src={contact.image} alt={`${contact.name} image`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {contact.name}
                    </p>
                    <p className="text-base text-gray-500 dark:text-gray-400">
                      {contact.email}
                    </p>
                  </div>
                  <span className={`inline-flex items-center ${contact.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} text-sm font-medium px-3 py-1 rounded-full dark:bg-green-900 dark:text-green-300`}>
                    <span className={`w-2 h-2 me-1 ${contact.status === 'Available' ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></span>
                    {contact.status}
                  </span>
                  <div className="flex space-x-4">
                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                      <img className="w-8 h-8" src={LinkedInIcon} alt="LinkedIn" />
                    </a>
                    <a href={contact.twitter} target="_blank" rel="noopener noreferrer">
                      <img className="w-8 h-8" src={TwitterIcon} alt="Twitter" />
                    </a>
                    <a href={contact.instagram} target="_blank" rel="noopener noreferrer">
                      <img className="w-8 h-8" src={InstagramIcon} alt="Instagram" />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>


  );
}

export default ContactList;
