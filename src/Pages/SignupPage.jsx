import headerLogo from "../assets/icons/headerLogo.svg";
import SignupForm from "../components/SignupForm";

const SignUpPage = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white sm:px-16 px-8 py-5 z-10">
      <nav className="flex justify-between items-center ml-0 max-w-screen-xl mx-auto">
        <a href="/" className="flex items-center">
          <img
            src={headerLogo}
            alt="Logo"
            width={149}
            height={59}
            className="m-0 w-[149px] h-[59px]"
          />
          <span className="text-lg font-semibold">
            Medical Expert System for Disease Prediction
          </span>
        </a>
      </nav>
      <SignupForm />
    </header>
  );

};

export default SignUpPage;
