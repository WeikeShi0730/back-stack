import { useEffect, useState } from "react";
import SignOut from "../../components/sign-out/sign-out.component";
import UpdatePassword from "../../components/update-password/update-password.component";
import { subscribeToAuthState, auth } from "../../firebase/firebase.utils";
import DeviceList from "../../components/device-list/device-list.component";

const Account = () => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

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
    <div className="h-full flex flex-col justify-center items-center">
      {currentUser ? (
        <div>
          <div className="text-5xl text-center mt-10 mb-4">
            Hi, {currentUser.displayName}!
          </div>
          <DeviceList />
          <UpdatePassword currentUser={currentUser} />
        </div>
      ) : null}
      <div className="">
        <SignOut />
      </div>
    </div>
  );
};

export default Account;
