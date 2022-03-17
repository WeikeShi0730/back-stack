import SignOut from "../../components/sign-out/sign-out.component";
import UpdatePassword from "../../components/update-password/update-password.component";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.utils";
import DeviceList from "../../components/device-list/device-list.component";

const Account = () => {
  const [currentUser] = useAuthState(auth);
  return (
    <>
      {currentUser ? (
        <div className="flex flex-col">
          <div className="text-5xl text-center m-10">
            Hi, {currentUser.displayName}!
          </div>
          <DeviceList />
          <UpdatePassword currentUser={currentUser} />
          <SignOut  />
        </div>
      ) : (
        <div>Please login first</div>
      )}
    </>
  );
};

export default Account;
