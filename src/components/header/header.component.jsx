import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { subscribeToAuthState, auth } from "../../firebase/firebase.utils";
import { useClickOutside } from "../../utils/use-click-outside";

const Header = () => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(() => !open));
  const handleOnClick = (event) => {
    event.preventDefault();
    setOpen(() => !open);
  };
  useEffect(() => {
    let isSubscribed = true;
    subscribeToAuthState((user) => {
      if (isSubscribed) {
        setCurrentUser(user);
      }
    });
    return () => (isSubscribed = false);
  });
  return (
    <>
      <nav className="sticky top-0 z-50">
        <div className="flex h-20 items-center flex-wrap bg-gray-300 bg-opacity-70 backdrop-blur-lg p-3 text-sm md:text-base lg:text-lg">
          <div className="flex flex-shrink-0 text-white mx-6">
            <Link to="/">
              <img
                className="fill-current xs:mr-2 h-6 sm:h-8 md:h-10 lg:h-12"
                src="/logo.png"
                alt="Back Stack"
              />
            </Link>
          </div>
          <div className="hidden lg:flex flex-shrink-0 text-white mx-2">
            <Link to="/">
              <div className="px-4 py-2 leading-none rounded text-black hover:bg-gray-300">
                Home 🏠
              </div>
            </Link>
          </div>
          <div className="hidden lg:flex flex-shrink-0 text-white mx-2">
            <Link to="/measure">
              <div className="px-4 py-2 leading-none rounded text-black hover:bg-gray-300">
                Measure 📐
              </div>
            </Link>
          </div>
          <div className="hidden lg:flex flex-shrink-0 text-white mx-2">
            <Link to="/excercise-report">
              <div className="px-4 py-2 leading-none rounded text-black hover:bg-gray-300">
                Excercise report 📒
              </div>
            </Link>
          </div>
          <div className="hidden lg:flex flex-shrink-0 text-white mx-2">
            <Link to="/device-connection">
              <div className="px-4 py-2 leading-none rounded text-black hover:bg-gray-300">
                Device connection 📶
              </div>
            </Link>
          </div>
          <div className="lg:flex flex-shrink-0 flex-grow"></div>
          <div className="hidden flex-shrink-0 lg:flex lg:items-center lg:w-auto">
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
          <div className="flex items-center justify-between lg:hidden mx-5">
            <button
              onClick={handleOnClick}
              className="flex h-6 w-6 items-center space-x-2 focus:outline-none font-light"
            >
              <div className="w-6 flex items-center justify-center relative">
                <span
                  className={`hamburger ${
                    open ? "translate-y-0 rotate-45" : "-translate-y-2"
                  }`}
                ></span>
                <span
                  className={`hamburger ${
                    open ? "opacity-0 translate-x-3" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`hamburger ${
                    open ? "translate-y-0 -rotate-45" : "translate-y-2"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
        <div
          className={`${
            open &&
            "absolute w-full -z-10 top-0 h-screen backdrop-brightness-75 backdrop-blur-sm"
          }`}
        />

        <div className="absolute h-screen top-0 right-0 -z-10 pt-20 text-sm md:text-base lg:text-lg">
          <Transition
            className="h-full"
            show={open}
            enter="transition duration-200 ease-in-out"
            enterFrom="translate-x-52"
            enterTo="translate-x-0"
            leave="transition duration-200 ease-in-out"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-52"
          >
            <div
              ref={ref}
              className="h-full flex flex-col items-end overflow-hidden divide-y divide-slate-400 bg-slate-200 text-slate-700"
            >
              <div className="w-52 py-5 text-center hover:shadow-md hover:bg-slate-300 transition-all ease-in-out duration-200">
                <Link to="/">
                  <div className="px-4 py-2 leading-none rounded text-black">
                    Home 🏠
                  </div>
                </Link>
              </div>
              <div className="w-52 py-5 text-center hover:shadow-md hover:bg-slate-300 transition-all ease-in-out duration-200">
                <Link to="/measure">
                  <div className="px-4 py-2 leading-none rounded text-black">
                    Measure 📐
                  </div>
                </Link>
              </div>
              <div className="w-52 py-5 text-center hover:shadow-md hover:bg-slate-300 transition-all ease-in-out duration-200">
                <Link to="/excercise-report">
                  <div className="px-4 py-2 leading-none rounded text-black">
                    Excercise report 📒
                  </div>
                </Link>
              </div>
              <div className="w-52 py-5 text-center hover:shadow-md hover:bg-slate-300 transition-all ease-in-out duration-200">
                <Link to="/device-connection">
                  <div className="px-4 py-2 leading-none rounded text-black">
                    Device connection 📶
                  </div>
                </Link>
              </div>
              <div className="w-52 py-5 text-center hover:shadow-md hover:bg-slate-300 transition-all ease-in-out duration-200">
                {currentUser ? (
                  <Link to={`/account/${currentUser.uid}`}>
                    <button className="px-4 py-2 leading-none rounded text-black lg:mt-0 font-light">
                      {currentUser.displayName}
                    </button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <button className="px-4 py-2 leading-none rounded text-black lg:mt-0 font-light">
                      Sign in
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </Transition>
        </div>
      </nav>
    </>
  );
};

export default Header;
