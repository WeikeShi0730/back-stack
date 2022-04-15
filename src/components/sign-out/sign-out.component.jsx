import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { signOutGoogle } from "../../firebase/firebase.utils";
import Loading from "../loading/loading.component";
import { toast } from "react-toastify";

const SignOut = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const clearCurrentUser = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await signOutGoogle();
      setLoading(false);
      history.push("/");
      toast.info("Signed out successfully!", {
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
      console.error("error clear current user", error);
    }
  };
  //   const handleDeleteRecord = async () => {
  //     try {
  //       await deleteUserRecord();
  //       //   toast.success("user record deleted successfully", {
  //       //     position: toast.POSITION.TOP_CENTER,
  //       //     theme: "dark",
  //       //     autoClose: 3000,
  //       //   });
  //     } catch (error) {
  //       //   toast.error("error deleting record: " + error.message, {
  //       //     position: toast.POSITION.TOP_CENTER,
  //       //     theme: "dark",
  //       //   });
  //       console.error("error deleting record", error.message);
  //     }
  //   };

  return (
    <>
      {loading && <Loading />}
      <div className="grid grid-rows-5 grid-flow-col gap-4 justify-items-center mt-10">
        <button
          onClick={clearCurrentUser}
          className="text-xs md:text-sm lg:text-base  py-2 px-4 text-red-500 rounded border border-red-500 font-light"
        >
          Sign out
        </button>

        <div />
        <div />
      </div>
    </>
  );
};

export default SignOut;
