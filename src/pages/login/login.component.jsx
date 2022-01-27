import SignUp from "../../components/sign-up/sign-up.component";
import SignIn from "../../components/sign-in/sign-in.component";

const Login = () => {
  return (
    <div className="grid grid-cols-2">
      <div>
        <SignUp className="" />
      </div>
      <div>
        <SignIn className="" />
      </div>
    </div>
  );
};

export default Login;
