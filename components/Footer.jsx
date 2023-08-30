"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white flex-shrink-0">
      <div className="container mx-auto py-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <img
              src="https://www.sprinklr.com/favicon-32x32.png?v=3105ca52bb3502e13ef7cf334fffe9da"
              alt="Sprinklr Logo"
              className="w-12 h-auto"
            />
            <p className="mt-2 text-sm">
              Unified Customer Experience Management
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Products</h2>
            <ul className="text-sm space-y-1">
              <li>
                <a href="#" className="hover:text-blue-300">
                  Social Media Management
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Advertising
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Company</h2>
            <ul className="text-sm space-y-1">
              <li>
                <a href="#" className="hover:text-blue-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <p className="text-sm">
              123 Sprinklr Street
              <br />
              New York, NY 12345
            </p>
            <p className="text-sm mt-2">support@sprinklr.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";

export default Footer;
