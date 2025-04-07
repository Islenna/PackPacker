import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/PackNestLogo.jpg';

const NavItem = ({ to, children, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    const baseClasses =
        "block py-2 pl-3 pr-4 rounded md:border-0 md:p-0 md:hover:bg-transparent";
    const activeClasses =
        "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-blue-500";
    const inactiveClasses =
        "text-gray-900 hover:bg-gray-100 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white";

    return (
        <li>
            <Link
                to={to}
                className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                aria-current={isActive ? "page" : undefined}
                onClick={onClick}
            >
                {children}
            </Link>
        </li>
    );
};

function Navbar() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img src={logo} className="h-10 mr-3" alt="PackNest Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        PackNest
                    </span>
                </Link>

                {/* Hamburger button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-dropdown"
                    aria-expanded={isOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>

                {/* Nav items (mobile + desktop) */}
                <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-dropdown">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <NavItem to="/" onClick={() => setIsOpen(false)}>Home</NavItem>
                        <NavItem to="/procedures" onClick={() => setIsOpen(false)}>Procedures</NavItem>
                        <NavItem to="/packs" onClick={() => setIsOpen(false)}>Packs</NavItem>
                        <NavItem to="/instruments" onClick={() => setIsOpen(false)}>Instruments</NavItem>
                        {user?.role === "admin" && (
                            <NavItem to="/admin" onClick={() => setIsOpen(false)}>Admin</NavItem>
                        )}

                        {user && (
                            <li>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsOpen(false);
                                    }}
                                    className="block py-2 pl-3 pr-4 text-red-600 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-red-400 dark:hover:text-white md:dark:hover:bg-transparent"
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
