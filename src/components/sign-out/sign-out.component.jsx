import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { signOutGoogle } from "../../firebase/firebase.utils";
import Loading from "../loading/loading.component";

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
    } catch (error) {
      setLoading(false);
      console.error("error clear current user", error);
    }
  };
  //   const handleDeleteAccount = async () => {
  //     clearCurrentUser();
  //     try {
  //       await deleteUserAccount();
  //       //   toast.info("deleted 🏁", {
  //       //     position: toast.POSITION.TOP_CENTER,
  //       //     theme: "dark",
  //       //     autoClose: 2000,
  //       //   });
  //     } catch (error) {
  //       //   toast.error("error deleting account: " + error.message, {
  //       //     position: toast.POSITION.TOP_CENTER,
  //       //     theme: "dark",
  //       //   });
  //       console.error("error deleting account", error.message);
  //     }
  //   };

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
