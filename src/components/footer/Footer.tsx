"use client"

function Footer(){
    return(     
        <footer className="bg-white rounded-lg shadow m-4 pb-4 font-glegoo">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center">
                    © 2024 
                    <a href="http://localhost:3000/" 
                        className="hover:underline">
                        MatchMyResume
                    </a>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    )
}

export default Footer;