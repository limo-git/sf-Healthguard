import {useState} from "react";
import  hamburger  from '../assets/icons/hamburger.svg';
import cross from "../assets/icons/cross.svg";
import headerLogo from "../assets/icons/headerLogo.svg";
import { navLinks } from "./constants";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setisMenuOpen]=useState(false);

  function toggleMenu(event){
    setisMenuOpen(!isMenuOpen);
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-white sm:px-16 px-8 py-5 z-10">
      <nav className="flex justify-between items-center ml-0 max-w-screen-xl mx-auto">
        <a href="/" className="flex items-center">
          <img
            src={headerLogo}
            alt="Logo"
            width={149}
            height={59}
            className="m-0 w-[149px] h-[59px]"
          />
          <span className="text-lg font-semibold">
            Medical Expert System for Disease Prediction
          </span>
        </a>
        {/* NavLinks */}
        <div className="hidden md:block">
          <ul className="flex-1 flex ml-10 items-baseline space-x-10 font-medium">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-montserrat leading-normal text-lg text-gray-600 hover:text-gray-800"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden mr-24 text-gray-800 hover:text-gray-500">
          <Link to="/login">Sign in</Link>
        </div>
        {/* Hamburger icon */}
        <div className="-mr-2 flex md:hidden">
          <img
            src={isMenuOpen ? cross : hamburger}
            alt={isMenuOpen ? "close icon" : "hamburger icon"}
            width={45}
            height={45}
            onClick={toggleMenu}
            className="inline-flex hover:cursor-pointer items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          />
        </div>
        {/* mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute inset-x-0 top-0 bg-white shadow-lg">
            <img
              src={cross}
              alt="close icon"
              width={20}
              height={20}
              onClick={toggleMenu}
              className="absolute top-2 right-2 cursor-pointer"
            />
            <div className="px-2 pt-14 pb-3 space-y-1 sm:px-3">
              {navLinks.map((item) => (
                <div key={item.label}>
                  <a
                    href={item.href}
                    className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-200"
                  >
                    {item.label}
                  </a>
                </div>
              ))}
              <div className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-200 cursor-pointer">
                <a href="/">Sign in</a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar