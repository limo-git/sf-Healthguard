const IndividualCard = ({ imgURL, label, subtext }) => {
  return (
    <div className="flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] px-10 py-10 mt-10 shadow-2xl">
      <div className="w-12 h-12 flex justify-center items-center rounded-full">
        <img src={imgURL} alt={label} />
      </div>
      <h3 className="mt-5 font-palanquin text-3xl leading-normal font-semibold">
        {label}
      </h3>
      <p className="mt-3 break-words font-montserrat text-lg leading-normal text-slate-700">
        {subtext}
      </p>
    </div>
  );
};

export default IndividualCard