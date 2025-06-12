import Button from "./Button";

const SignupForm = () => {
  return (
    <div className="-mt-14 flex flex-col items-center justify-center min-h-screen">
      <p className="mt-0 break-words font-montserrat text-2xl font-bold leading-normal text-slate-900">
        Elevate our project with your expertise
      </p>
      <div className="w-full md:w-3/4 flex justify-center">
        <div className="bg-white rounded-[20px] px-10 py-10 mt-5 shadow-2xl">
          <h3 className="font-palanquin text-2xl leading-normal font-semibold">
            Sign Up
          </h3>
          <form action="/">
            <div className="flex flex-col mt-4 items-center">
              <div className="w-full mb-3">
                <label htmlFor="username">Email</label>
                <input
                  id="username"
                  type="email"
                  className="w-full rounded-xl border border-slate-600 px-4 py-2"
                />
              </div>
              <div className="w-full mb-3">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="w-full rounded-xl border border-slate-600 px-4 py-2"
                />
              </div>
              <div className="w-full">
                <label htmlFor="registration">Registration Number</label>
                <input
                  id="registration"
                  type="text"
                  className="w-full rounded-xl border border-slate-600 px-4 py-2"
                />
              </div>
            </div>
            <div className="mt-5 flex justify-center">
              <Button label="Sign Up" />
            </div>
          </form>
          <div className="mt-5 text-center">
            <span>Not your first time here?</span>
            <a
              href="./"
              className="ml-2 text-customblue font-bold cursor-pointer"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
