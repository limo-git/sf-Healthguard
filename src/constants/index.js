import contribute from '../assets/icons/contribute.svg'
import improvements from '../assets/icons/improvements.svg'
import feedback from '../assets/icons/feedback.svg'
import facebook from "../assets/icons/facebook.svg";
import instagram from "../assets/icons/instagram.svg";
import twitter from "../assets/icons/twitter.svg";

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about-us", label: "About Us" },
  { href: "#feedback", label: "Feedback" },
];

export const cardsData = [
  {
    imgURL: contribute,
    label: "Contribute",
    subtext:
      "Contribute to the dataset by assigning values to probabilites and severities.",
  },
  {
    imgURL: improvements,
    label: "Improve",
    subtext: "Alter the dataset by adding/removing a symptom or a disease.",
  },
  {
    imgURL: feedback,
    label: "Give Feedback",
    subtext: "Give us your valuable feedback and suggestions to help us improve.",
  },
];

export const socialMedia = [
  { src: facebook, alt: "facebook logo" },
  { src: twitter, alt: "twitter logo" },
  { src: instagram, alt: "instagram logo" },
];
