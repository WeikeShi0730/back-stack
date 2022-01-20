import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  signInWithGoogle,
  signInWithEmail,
} from "../../firebase/firebase.utils";

const SignIn = () => {
  const history = useHistory();
  const [signInInfo, setSignInInfo] = useState({
    email: "",
    password: "",
  });

  const handleClick = async () => {
    try {
      await signInWithGoogle();
      history.push("/");
    } catch (error) {
      console.error("error signing in with google: ", error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmail(signInInfo);
      history.push("/");
    } catch (error) {
      //   toast.error("error signing in: " + error.message, {
      //     position: toast.POSITION.TOP_CENTER,
      //     theme: "dark",
      //   });
      console.error("error signing in with email: ", error);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setSignInInfo({
      ...signInInfo,
      [name]: value,
    });
  };

  return (
    <React.Fragment>
      <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg m-auto mt-10 mb-4 bg-white rounded-lg border border-primaryBorder shadow-default py-8 px-10">
        <div className="text-base lg:text-lg font-medium text-primary mt-4 mb-12 text-center">
          Log in to your account 🔐
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-sm md:text-base">Email</label>
            <input
              required
              name="email"
              type="email"
              className="w-full p-2 text-xs md:text-md text-primary border rounded-md outline-none transition duration-150 ease-in-out mb-4"
              id="email"
              placeholder="Your email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-sm md:text-base">Password</label>
            <input
              required
              name="password"
              type="password"
              className="w-full p-2 text-xs md:text-md text-primary border rounded-md outline-none transition duration-150 ease-in-out mb-4"
              id="password"
              placeholder="Your password"
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              type="submit"
              className="text-xs md:text-sm bg-gray-800 py-2 px-4 text-white rounded border focus:outline-none"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>

      <div className="w-full max-w-md mx-auto mt-4">
        <div className="flex justify-center">
          <div>
            <button
              className="text-xs md:text-sm bg-blue-500 py-2 px-4 text-white rounded border focus:outline-none focus:bg-gray-550"
              onClick={handleClick}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto mt-4">
        <div className="text-base lg:text-lg flex justify-center items-center">
          Don't have an account yet?
        </div>
        <div>
          <Link to="/sign-up">
            <div className="flex justify-center items-center mt-6">
              <button className="text-xs md:text-sm bg-gray-800 py-2 px-4 text-white rounded border focus:outline-none">
                Sign up
              </button>
            </div>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
