"use client"

import React, { useState } from "react";
import Link from 'next/link';

function NavbarResume(){

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return(
        <nav className="bg-white dark:bg-white fixed w-full z-20 top-0 start-0 border-gray-50 dark:border-gray-100">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/home-resume" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-custom-blue">MatchMyResume</span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button type="button" className="text-white bg-custom-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-custom-blue dark:hover:bg-blue-700 dark:focus:ring-blue-800">SignUp</button>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-custom-blue rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-custom-blue dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div className={`items-center justify-between ${isOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-white md:dark:bg-white dark:border-gray-700">
                        <li>
                            <Link href="/keyword-generator" className="block py-2 px-3 text-custom-blue rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-custom-blue dark:text-custom-blue dark:hover:bg-gray-700 dark:hover:text-custom-blue md:dark:hover:bg-transparent dark:border-gray-700">Generate Keywords</Link>
                        </li>
                        <li>
                            <Link href="/compare-job-resume" className="block py-2 px-3 text-custom-blue rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-custom-blue dark:text-custom-blue dark:hover:bg-gray-700 dark:hover:text-custom-blue md:dark:hover:bg-transparent dark:border-gray-700">Compare Job&Resume</Link>
                        </li>
                        <li>
                            <Link href="/dashboard-resume" className="block py-2 px-3 text-custom-blue rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-custom-blue dark:text-custom-blue dark:hover:bg-gray-700 dark:hover:text-custom-blue md:dark:hover:bg-transparent dark:border-gray-700">Dashboard</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavbarResume;