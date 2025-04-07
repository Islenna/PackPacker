import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

function Log({ toggleForm }) {
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const { login } = useAuth();

    const loginHandler = (e) => {
        e.preventDefault();
        const payload = {
            email: loginEmail.toLowerCase(),
            password: loginPassword,
        };

        axiosInstance.post('/user/login', payload)
            .then((res) => {
                if (res.data && res.data.access_token) {
                    localStorage.setItem("usertoken", res.data.access_token);
                    login(res.data.access_token, res.data.user);
                    toast.success("Login successful!");
                    navigate('/procedures');
                }
            })
            .catch((err) => {
                console.error("Login failed:", err.response || err.message);
                if (err.response?.status === 401) {
                    toast.error("Incorrect email or password.");
                } else if (err.response?.status === 422) {
                    toast.error("Please enter a valid email and password.");
                } else {
                    toast.error("Something went wrong. Please try again.");
                }
            });
    };


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={loginHandler}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required />
                            </div>
                            <div className="relative">
                                <input
                                    type={passwordShown ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                    style={{ outline: 'none' }}
                                >
                                    <FontAwesomeIcon
                                        icon={passwordShown ? faEyeSlash : faEye}
                                        className="text-gray-700 dark:text-gray-200"
                                    />
                                </button>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <span onClick={toggleForm} className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">
                                    Sign up
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Log;
