import Button from "./Button";
import google from '../assets/icons/google.svg'
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="flex items-start justify-center min-h-screen">
      <div className="w-full md:w-3/4 flex justify-center">
        <div className="bg-white rounded-[20px] px-10 py-10 mt-5 shadow-2xl">
          <h3 className="font-palanquin text-2xl leading-normal font-semibold">
            Sign In
          </h3>
          <p className="mt-0 break-words font-montserrat text-medium leading-normal text-slate-700">
            Share your knowledge to make an impact
          </p>
          <form action="/">
            <div className="flex flex-col mt-6 items-center">
              <div className="w-full mb-4">
                <input
                  type="email"
                  placeholder="Username"
                  className="w-full rounded-xl border border-slate-600 px-4 py-2"
                />
              </div>
              <div className="w-full">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-xl border border-slate-600 px-4 py-2"
                />
              </div>
            </div>
            <a href="./" className="text-left text-xs mt-1 ml-2 cursor-pointer">
              Forget Password?
            </a>
            <div className="mt-3 flex justify-center">
              <Button label="Sign In" />
            </div>
            <div className="my-2 flex justify-center relative">
              <hr className="absolute left-0 top-1/2 w-3/4 bg-gray-700 transform -translate-y-1/2" />
              <span className="px-2 bg-white z-10">Or</span>
              <hr className="absolute right-0 top-1/2 w-3/4 bg-gray-700 transform -translate-y-1/2" />
            </div>
            <div className="flex justify-center">
              <Button
                label="Continue with Google"
                iconUrl={google}
                backgroundColor="bg-white"
                borderColor="border border-black"
                textColor="text-black"
                fullWidth={true}
                iconPosition="before"
              />
            </div>
          </form>
          <div className="mt-3">
            <span>New to Medical Expert System?</span>
            <Link 
              to="/signup"
              className="ml-2 text-customblue font-bold cursor-pointer"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
