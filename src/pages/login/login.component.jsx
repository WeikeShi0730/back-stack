import SignUp from "../../components/sign-up/sign-up.component";
import SignIn from "../../components/sign-in/sign-in.component";

const Login = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:h-full w-full items-center justify-evenly">
      <div className="m-5 p-5">
        <SignUp className="" />
      </div>
      <div className="m-5 p-5">
        <SignIn className="" />
      </div>
    </div>
  );
};

export default Login;
