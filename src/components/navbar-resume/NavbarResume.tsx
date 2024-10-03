"use client"

import React, { useState, useEffect, useContext } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ResumeButton from "../reusable-components/ResumeButton";
import UserContext from "@/contexts/UserContext";
import { FiLogOut } from "react-icons/fi";
import LoginModal from "../reusable-components/LoginModal";

function NavbarResume(){

    const [isOpen, setIsOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isLoginCompareModalOpen, setIsLoginCompareModalOpen] = useState(false);
    const userContext = useContext(UserContext);
    const router = useRouter();

    if (!userContext) {
        throw new Error("UserContext is undefined, make sure NavbarResume is wrapped in a UserProvider");
    }

    const { user, logOutUser } = userContext;

    const handleLogout = () => {
        logOutUser();
        router.push('/')
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleUserMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (!(event.target instanceof Element)) return;
        if (!event.target.closest('.relative')) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        if (showMenu) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showMenu]);

    const handleDashboardClick = (e: React.MouseEvent) => {
        if (!user) {
            e.preventDefault(); 
            setIsLoginModalOpen(true); 
            return
        }
    };

    const handleCompareClick = (e: React.MouseEvent) => {
        if (!user) {
            e.preventDefault(); 
            setIsLoginCompareModalOpen(true); 
            return
        }
    };


    return(
        <div className="fixed font-glegoo bg-white w-full z-20 top-0 start-0 border-gray-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-xl font-glegoo font-semibold whitespace-nowrap text-custom-blue tracking-tighter">
                        MatchMyResume
                    </span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                {user ?
                 (
                    <div className="relative">
                        <button 
                            className="bg-icon-color hover:bg-button-blue text-white font-bold py-2 px-4 rounded-full"
                            onClick={toggleUserMenu}
                        >
                            {user.username ? user.username.charAt(0).toUpperCase() : ''}
                        </button>

                        {showMenu && (
                            
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">

                                <div className="px-4 py-2 text-custom-blue text-center">
                                    Hi, <span className="text-icon-color">{user.username}!</span>
                                </div>

                                <Link href="/profile" className="block px-4 py-2 text-custom-blue text-center underline underline-offset-2 hover:bg-gray-100">
                                    Your Account
                                </Link>

                                <button
                                    className="block w-full text-left px-4 py-2 text-from-background hover:bg-gray-100 flex justify-center"
                                    onClick={handleLogout}
                                >
                                        Sign Out<FiLogOut className="ml-2 text-xl"/>
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                        <Link href="/login">
                            <ResumeButton text="Sign in" />
                        </Link>
                )}

                    <button data-collapse-toggle="navbar-default" 
                            type="button" 
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-custom-blue hover:text-button-blue md:hidden" 
                            aria-controls="navbar-default" 
                            aria-expanded="false"
                            onClick={toggleMenu}
                    >
                        <span className="sr-only">
                            Open main menu
                        </span>
                        <svg className="w-5 h-5" 
                             aria-hidden="true" 
                             xmlns="http://www.w3.org/2000/svg" 
                             fill="none" 
                             viewBox="0 0 17 14"
                        >
                            <path stroke="currentColor" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
                <div className={`items-center justify-between ${isOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-200 ">
                        <li>
                            <Link href="/keyword-generator" 
                                  className="block py-2 px-3 text-custom-blue bg-white hover:text-button-blue">
                                    Generate Keywords
                            </Link>
                        </li>
                        <li>
                            <Link href="/compare-job-resume" 
                                  className="block py-2 px-3 text-custom-blue bg-white hover:text-button-blue" onClick={handleCompareClick}>
                                    Compare Job&Resume
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard-resume" 
                                  className="block py-2 px-3 text-custom-blue bg-white hover:text-button-blue" onClick={handleDashboardClick}>
                                    Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <LoginModal
                 isOpen={isLoginModalOpen} 
                 onClose={() => setIsLoginModalOpen(false)} 
                 confirmText="Please log in to access the dashboard" 
            />
            <LoginModal
                 isOpen={isLoginCompareModalOpen} 
                 onClose={() => setIsLoginCompareModalOpen(false)} 
                 confirmText="Please log in to compare" 
            />
        </div>
    )
}

NavbarResume.displayName = "NavbarResume";
export default React.memo(NavbarResume);
