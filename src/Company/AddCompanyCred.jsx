import React, { useState } from 'react';
import axios from 'axios';
import api from '../Api/Api';
import toast from 'react-hot-toast';

const RefCom = () => {
    const [formData, setFormData] = useState({
        cname: '',
        email: '',
        password: '',
        status:"company"
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loading = toast.loading('Making the Credentials');
        try {
            const response = await api.post('/add-compony-cred', formData);
            toast.dismiss(loading);
            setSuccessMessage("Credentials added successfully 👍 ");
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add Company</h2>
            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
            {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">Company Name:</label>
                    <input type="text" name="cname" value={formData.cname} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
            </form>
        </div>
    );
};

export default RefCom;
