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
    <>
      {currentUser ? (
        <div className="flex flex-col">
          <div className="text-5xl text-center m-10">
            Hi, {currentUser.displayName}!
          </div>
          <DeviceList />
          <UpdatePassword currentUser={currentUser} />
        </div>
      ) : null}
      <SignOut />
    </>
  );
};

export default Account;
