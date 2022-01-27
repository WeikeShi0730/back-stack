import { sendChangePasswordEmail } from "../../firebase/firebase.utils";
const UpdatePassword = ({ currentUser }) => {
  const handleClick = async () => {
    try {
      await sendChangePasswordEmail(currentUser);
      alert("Password reset email sent to: ", currentUser.displayName);
    } catch (error) {
      console.error("Error sending the email: ", error);
    }
  };

  return (
    <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg m-auto mt-10 mb-4 bg-white rounded-lg border border-primaryBorder shadow-default py-8 px-10">
      <div className="text-center m-5">Update my password?</div>
      <span>
        <button
          onClick={handleClick}
          className="text-xs md:text-sm bg-gray-800 py-2 px-4 text-white rounded border focus:outline-none font-light"
        >
          Send a password update email
        </button>
      </span>
    </div>
  );
};

export default UpdatePassword;
