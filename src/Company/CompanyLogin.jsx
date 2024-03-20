import React, { useEffect, useState } from 'react';
import api from '../Api/Api'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const CompanyLogin = () => {
    const navigate = useNavigate()
    const [loginInputs, setLoginInputs] = useState({ email: '', password: '' });
    const [signupInputs, setSignupInputs] = useState({ username: '', email: '', password: '' });
    const [isSignUp, setIsSignUp] = useState(false);

   
  

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginInputs({
            ...loginInputs,
            [name]: value
        });
    };

    const handleSignupInputChange = (e) => {
        const { name, value } = e.target;
        setSignupInputs({
            ...signupInputs,
            [name]: value
        });
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        // Handle sign in logic
        console.log('Signing in with:', loginInputs.email, loginInputs.password);

        const loading = toast.loading('wait! Authentication is in progress')
        api.post('/company-login', loginInputs).then((res) => {
            console.log(res.data);
            sessionStorage.setItem('access_token', JSON.stringify(res.data.access_token))
            sessionStorage.setItem('status', JSON.stringify(res.data.status))
            sessionStorage.setItem('name', JSON.stringify(res.data.name))
            toast.dismiss(loading)
            navigate('/company')
            return toast.success("login done successfully")
        })
            .catch(err => {
                console.log(err);
                toast.dismiss(loading)
                return toast.error(err.response.data.error)
            })
    };

   

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">Company Login</h2>

                <form onSubmit={handleLoginSubmit}>
                    <input
                        type="text"
                        name="email"
                        placeholder="email"
                        className="input"
                        value={loginInputs.email}
                        onChange={handleLoginInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="input"
                        value={loginInputs.password}
                        onChange={handleLoginInputChange}
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md"
                    >
                        Sign In
                    </button>
                </form>


            </div>
        </div>
    );
};

export default CompanyLogin;
