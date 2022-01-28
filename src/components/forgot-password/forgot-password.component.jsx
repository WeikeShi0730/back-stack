import { useState } from "react";
import { sendChangePasswordEmail } from "../../firebase/firebase.utils";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setEmail(() => value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendChangePasswordEmail(email);
      alert("Password reset email sent to: " + email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg m-auto mt-10 mb-4 bg-white rounded-lg border border-primaryBorder shadow-default py-8 px-10">
      <div className="text-center m-5">Reset my password</div>
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
        <div className="flex justify-center items-center mt-6">
          <button
            type="submit"
            className="text-xs md:text-sm bg-gray-800 py-2 px-4 text-white rounded border focus:outline-none font-light"
          >
            Send a password reset email
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
