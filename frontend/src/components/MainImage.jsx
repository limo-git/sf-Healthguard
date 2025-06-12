import collegeMain from "../assets/images/collegeMain.png";
import Button from './Button'
import arrowRight from "../assets/icons/arrowRight.svg";

const MainImage = () => {
  return (
    <div className="relative w-full h-screen">
      <img
        src={collegeMain}
        alt="Logo"
        className="object-cover w-full h-full"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold text-center">
        <div className="font-palanquin text-3xl text-white font-bold">
          Medical Expert System for Disease Prediction
        </div>
        <div className="font-palanquin text-2xl text-slate-300 font-semibold">
          Disease Data Input Portal
        </div>
        <div className="mt-7 flex justify-center">
          <Button
            label="Explore more"
            iconUrl={arrowRight}
            backgroundColor="bg-sky-300"
            borderColor="border border-sky-300"
            textColor="text-black"
            iconPosition="after"
          />
        </div>
      </div>
    </div>
  );
};

export default MainImage;
