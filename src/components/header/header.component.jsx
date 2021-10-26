import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState();
  return (
    <div>
      <nav className="flex items-center flex-wrap bg-gray-300 p-3">
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
            <div className="px-4 py-2 leading-none rounded text-black hover:bg-gray-300">home</div>
          </Link>
        </div>
        <div className="flex flex-shrink-0 text-sm md:text-base lg:text-lg text-white mx-2">
          <Link to="/measure">
            <div className="px-4 py-2 leading-none rounded text-black hover:bg-gray-300">measure</div>
          </Link>
        </div>
        <div className="flex flex-shrink-0 text-sm md:text-base lg:text-lg text-white mx-2">
          <Link to="/excercise-report">
            <div className="px-4 py-2 leading-none rounded text-black hover:bg-gray-300">excercise report</div>
          </Link>
        </div>
        <div className="flex flex-shrink-0 text-sm md:text-base lg:text-lg text-white mx-2">
          <Link to="/device-connection">
            <div className="px-4 py-2 leading-none rounded text-black hover:bg-gray-300">device connection</div>
          </Link>
        </div>
        <div className="flex flex-shrink-0 flex-grow "></div>

        <div className="flex flex-shrink-0 text-sm md:text-base lg:text-lg lg:flex lg:items-center lg:w-auto">
          {user ? (
            <Link to={`/sign-out/${user.id}`}>
              <button className="px-4 py-2 leading-none rounded text-black hover:bg-gray-300 lg:mt-0">
                {user.name}
              </button>
            </Link>
          ) : (
            <Link to="/sign-in">
              <button className="px-4 py-2 leading-none rounded text-black hover:bg-gray-300 lg:mt-0">
                sign in
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
