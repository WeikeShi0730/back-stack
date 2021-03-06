import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { signOutGoogle, auth } from "../../firebase/firebase.utils";
import Loading from "../loading/loading.component";
import { toast } from "react-toastify";

const SignOut = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  const clearCurrentUser = async (event) => {
    event.preventDefault();
    try {
      if (auth.currentUser) {
        setLoading(true);
        await signOutGoogle();
        history.push("/");
        setLoading(false);
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
      }
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

  return (
    <>
      {loading && <Loading />}
      <div className="mt-10">
        <button
          onClick={clearCurrentUser}
          className="text-xs md:text-sm lg:text-base py-2 px-4 text-red-500 rounded border border-red-500 font-light"
        >
          Sign out
        </button>
      </div>
    </>
  );
};

export default SignOut;
