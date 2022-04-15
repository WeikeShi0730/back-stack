import { useState } from "react";
import { sendChangePasswordEmail } from "../../firebase/firebase.utils";
import Loading from "../loading/loading.component";
import { toast } from "react-toastify";

const UpdatePassword = ({ currentUser }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const { email } = currentUser;
      setLoading(true);
      await sendChangePasswordEmail(email);
      setLoading(false);
      toast.success(`Password reset email sent to: ${email}`, {
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
      toast.error(`Error sending the email: ${error.message}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.error("Error sending the email: ", error);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="w-80 m-auto mt-10 mb-4 bg-white rounded-lg border border-primaryBorder shadow-default py-8 px-10">
        <div className="flex flex-col items-center">
          <div className="text-center m-5">Update my password?</div>
          <button
            onClick={handleClick}
            className="text-xs md:text-sm bg-gray-800 py-2 px-4 text-white rounded border focus:outline-none font-light"
          >
            Send a password update email
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
