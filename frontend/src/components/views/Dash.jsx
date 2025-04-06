import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Log from '../LogAndReg/Log';
import Reg from '../LogAndReg/Reg';
import { Link } from 'react-router-dom';

function Dash() {
    const { user } = useAuth(); // ✅ grab user from context
    const [showLogin, setShowLogin] = useState(true);

    const toggleForm = () => setShowLogin(prev => !prev);

    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    {/* If no user, show login/register */}
                    {!user ? (
                        showLogin ? <Log toggleForm={toggleForm} /> : <Reg toggleForm={toggleForm} />
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                Welcome back, {user.email || 'friend'}!
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-center">
                                Head to the procedures tab or explore the site using the navigation above.
                            </p>
                        </div>
                    )}

                    {/* Shared side content */}
                    <div className="mt-4 md:mt-0">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                            A surgery procedure, pack, and instrument database.
                        </h2>
                        <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                            PackNest assists your sterilization team in knowing what goes where,
                            and your surgical team in knowing what needs what.
                        </p>
                        <Link
                            to="/procedures"
                            className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
                        >
                            Get started
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Dash;
