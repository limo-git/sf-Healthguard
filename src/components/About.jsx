import imgAboutUs from "../assets/images/img-about-us.jpg";

const About = () => {
  return (
    <section
      id="about-us"
      className=" flex justify-between items-center max-lg:flex-col gap-10 w-full max-container"
    >
      {/* Image div */}
      <div className="flex-1 flex justify-center items-center">
        <img
          src={imgAboutUs}
          alt="product detail"
          width={570}
          height={522}
          className="object-contain"
        />
      </div>

      {/* Content div */}
      <div className="flex flex-1 flex-col justify-center items-center bg-sky-600/[0.13] rounded-lg pt-9 pb-9 pl-5 pr-5">
        <h2 className="font-palanquin capitalize text-4xl lg:max-w-lg font-semibold">
          About
          <span className="text-gray-700"> Our </span>
          <span className="text-gray-700"> Project </span>
        </h2>
        <p className="mt-4 lg:max-w-lg info-text">
          'Medical Expert System for Disease Prediction' project introduces a
          comprehensive dataset designed for rule-based medical disease
          prediction, focusing on OPD (Outpatient Department) level diseases.
          The dataset incorporates disease-symptom associations, along with
          probabilities (0-3 scale) indicating symptom prevalence and
          criticality levels (0-3 scale) highlighting symptom importance.
        </p>
        <p className="mt-4 lg:max-w-lg info-text">
          This dataset fuels a rule-based prediction system. The system analyzes
          initial disease probabilities, then iteratively refines potential
          diagnoses based on user-reported symptoms. The final recommendation
          considers both initial probabilities and user interactions.
        </p>
      </div>
    </section>
  );
};

export default About;
