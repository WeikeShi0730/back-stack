import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  signInWithGoogle,
  signInWithEmail,
} from "../../firebase/firebase.utils";
import Loading from "../loading/loading.component";
import { toast } from "react-toastify";

const SignIn = () => {
  const history = useHistory();
  const [signInInfo, setSignInInfo] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignInGoogle = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await signInWithGoogle();
      setLoading(false);
      history.push("/");
      toast.success("🥳 Signed in successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.error("error signing in with Google: ", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await signInWithEmail(signInInfo);
      setLoading(false);
      history.push("/");
      toast.success("🥳 Signed in successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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

  const handleClickForgotPassword = () => {
    history.push("/reset-password");
  };

  return (
    <>
      {loading && <Loading />}
      <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg m-auto mt-10 mb-4 bg-white rounded-lg border border-primaryBorder shadow-default py-8 px-10">
        <div className="text-base lg:text-lg font-light text-primary mt-4 mb-12 text-center">
          Alrady have an account? Sign in 🔐
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-sm md:text-base">Email</label>
            <input
              required
              name="email"
              type="email"
              className="w-full p-2 text-xs md:text-md text-primary border rounded-md outline-none transition duration-150 ease-in-out mb-4"
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
              placeholder="Your password"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center items-center mt-6">
            <button
              type="submit"
              className="text-xs md:text-sm bg-gray-800 py-2 px-4 text-white rounded border focus:outline-none font-light"
              name="signInWithEmail"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="flex justify-center items-center mt-6">
          <button
            type="submit"
            className="text-xs md:text-sm bg-blue-500 py-2 px-4 text-white rounded border focus:outline-none focus:bg-gray-550 font-light"
            name="signInWithGoogle"
            onClick={handleSignInGoogle}
          >
            Sign in with Google
          </button>
        </div>
        <div>
          <button onClick={handleClickForgotPassword} className="font-light">
            Forgot password?
          </button>
        </div>
      </div>
    </>
  );
};

export default SignIn;
