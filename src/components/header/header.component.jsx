import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.utils";

const Header = () => {
  const [currentUser] = useAuthState(auth);
  return (
    <div>
      <nav className="flex items-center flex-wrap bg-gray-300 bg-opacity-70 backdrop-blur-lg p-3">
        <div className="flex flex-shrink-0 text-white mx-6">
          <Link to="/">
            <img
              className="fill-current xs:mr-2 h-6 sm:h-8 md:h-10 lg:h-12"
              src="/logo.png"
              alt="Back Stack"
            />
          </Link>
        </div>
        <div className="flex flex-shrink-0 text-sm md:text-base lg:text-lg text-white mx-2">
          <Link to="/">
            <div className="px-4 py-2 leading-none rounded text-black hover:bg-gray-300">
              Home 🏠
            </div>
          </Link>
        </div>
        <div className="flex flex-shrink-0 text-sm md:text-base lg:text-lg text-white mx-2">
          <Link to="/measure">
            <div className="px-4 py-2 leading-none rounded text-black hover:bg-gray-300">
              Measure 📐
            </div>
          </Link>
        </div>
        <div className="flex flex-shrink-0 text-sm md:text-base lg:text-lg text-white mx-2">
          <Link to="/excercise-report">
            <div className="px-4 py-2 leading-none rounded text-black hover:bg-gray-300">
              Excercise report 📒
            </div>
          </Link>
        </div>
        <div className="flex flex-shrink-0 text-sm md:text-base lg:text-lg text-white mx-2">
          <Link to="/device-connection">
            <div className="px-4 py-2 leading-none rounded text-black hover:bg-gray-300">
              Device connection 📶
            </div>
          </Link>
        </div>
        <div className="flex flex-shrink-0 flex-grow "></div>

        <div className="flex flex-shrink-0 text-sm md:text-base lg:text-lg lg:flex lg:items-center lg:w-auto">
          {currentUser ? (
            <Link to={`/account/${currentUser.uid}`}>
              <button className="px-4 py-2 leading-none rounded text-black hover:bg-gray-300 lg:mt-0 font-light">
                {currentUser.displayName}
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 leading-none rounded text-black hover:bg-gray-300 lg:mt-0 font-light">
                Sign in
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
