import React from "react";
import { FaFacebook, FaGithub, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 text-gray-800 py-10 border-t border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between gap-8">
          {/* Brand/Logo */}
          <div className="w-full md:w-auto flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold text-gray-900">UltronicMart</h2>
            <p className="text-gray-600 mt-2 text-center md:text-left">
               Get free delivery on orders over $100!
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-auto">
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Quick Links</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link to="/" className="hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="w-full md:w-auto">
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Customer Service</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link to="/faq" className="hover:text-primary transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-primary transition">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-auto flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/codernirmal7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary transition"
              >
                <FaXTwitter size={25} />
              </a>
              <a
                href="https://github.com/codernirmal7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary transition"
              >
                <FaGithub size={25} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} UltronicMart. All Rights Reserved.
          </p>
          <ul className="flex space-x-6 text-sm">
            <li>
              <Link to="/terms" className="hover:text-primary transition">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-primary transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
