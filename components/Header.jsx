import React from 'react';

const Header = () => {
    return (
        <header className="bg-blue-900 text-white">
            <div className="container mx-auto py-4 px-6 flex items-center justify-between">
                <div className="flex items-center">
                    <img
                        src="https://www.sprinklr.com/wp-content/themes/sprinklr/assets/images/logo.svg"
                        alt="Sprinklr Logo"
                        className="w-12 h-auto"
                    />
                    <div className="ml-2">
                        <h1 className="font-semibold text-lg">Sprinklr</h1>
                        <p className="text-xs">Unified Customer Experience Management</p>
                    </div>
                </div>
                <nav className="space-x-4">
                    <a href="#" className="hover:text-blue-300">Products</a>
                    <a href="#" className="hover:text-blue-300">Solutions</a>
                    <a href="#" className="hover:text-blue-300">Resources</a>
                    <a href="#" className="hover:text-blue-300">Company</a>
                    <a href="#" className="hover:text-blue-300">Request Demo</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
