import React from "react";

const Footer = () => {
    return (
        <footer className="w-full bg-gray-900 text-gray-400 py-4 h-30">
            <div className="flex flex-col items-center gap-1 text-sm">
                <p>© {new Date().getFullYear()} MyYouTube</p>

                <div className="flex gap-4">
                    <span className="hover:text-white cursor-pointer">
                        About
                    </span>
                    <span className="hover:text-white cursor-pointer">
                        Privacy
                    </span>
                    <span className="hover:text-white cursor-pointer">
                        Terms
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
