import headerLogo from "../assets/icons/headerLogo.svg";
import { socialMedia } from "../constants";

const Footer = () => {
  return (
    <footer className="max-container py-6 lg:py-8">
      <div className="flex justify-between items-start gap-6 flex-wrap max-lg:flex-col ">
        <div className="flex flex-col items-start">
          <a href="/">
            <img
              src={headerLogo}
              alt="logo"
              width={120}
              height={36}
              className="ml-10"
            />
          </a>
        </div>

        <div className="flex flex-col mt-6 lg:flex-row lg:gap-6 lg:mt-0">
          <div className="w-full lg:w-auto">
            <p className="text-base leading-6 font-montserrat text-gray-700 sm:max-w-sm">
              We are motivated to make our project better. Your input helps
              reach our project to greater heights. We are thankful for your
              contributions and time.
            </p>
            <div className="flex justify-center gap-3 mt-4">
              {socialMedia.map((icon) => (
                <div
                  className="flex justify-center items-center w-8 h-8 bg-sky-200 rounded-full cursor-pointer"
                  key={icon.alt}
                >
                  <img src={icon.src} alt={icon.alt} width={20} height={20} />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full mt-6 lg:mt-0 lg:w-1/3">
            <div className="font-palanquin capitalize text-xl font-semibold mb-2">
              Address
            </div>
            <div className="text-gray-700">
              Indian Institute of Information Technology Allahabad Devghat,{" "}
              <br />
              Jhalwa, Prayagraj-211015, U. P. INDIA
            </div>
          </div>
          <div className="w-full mt-6 lg:mt-0 lg:w-1/3">
            <div className="font-palanquin capitalize text-xl font-semibold mb-2">
              Get in Touch
            </div>
            <div className="text-gray-700">
              <div>Phone: 91-532-2922000</div>
              <div>Fax: 91-532-2922125</div>
              <div>Email: contact@iiita.ac.in</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
