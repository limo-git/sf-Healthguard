import IndividualCard from './IndividualCard'
import Button from './Button'
import arrowRight from '../assets/icons/arrowRight.svg'
import { DiseaseService } from "../services/DiseaseService";
import headerLogo from "../assets/icons/headerLogo.svg";
import config from "../chatbot/config";
import MessageParser from "../chatbot/MessageParser";
import ActionProvider from "../chatbot/ActionProvider";
import LoginPage from "../Pages/LoginPage";
import { Disease } from "../models/Disease";
import { navLinks, cardsData } from "./constants";
import doctor_image_url from "../assets/images/doctor-img.jpg";
import App from "../App";
import "../index.css";
import dataset from "../assets/dataset/dataset.json";

const Cards = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <p className="font-palanquin text-center capitalize text-4xl lg:max-w-full font-semibold">
        Elevate our project with
        <span className="text-gray-700"> Your </span>
        <span className="text-gray-700"> Expertise </span>
      </p>
      <section className="max-container flex justify-center flex-wrap gap-9 mb-8">
        {cardsData.map((entry) => (
          <IndividualCard key={entry.label} {...entry} />
        ))}
      </section>
      <Button label="Get Started" iconUrl={arrowRight} iconPosition="after" />
    </div>
  );
}

export default Cards