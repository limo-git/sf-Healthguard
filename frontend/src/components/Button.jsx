const Button = ({
  label,
  iconUrl,
  backgroundColor,
  textColor,
  borderColor,
  fullWidth,
  iconPosition
}) => {
  return (
    <button
      className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none
      ${
        backgroundColor
          ? `${backgroundColor} ${textColor} ${borderColor}`
          : "bg-customblue text-white border-customblue"
      } rounded-full ${fullWidth && "w-full"}`}
    >
      {iconPosition === "before" && iconUrl && (
        <img
          src={iconUrl}
          alt="Icon"
          className="mr-2 rounded-full bg-white w-5 h-5"
        />
      )}
      {label}
      {iconPosition === "after" && iconUrl && (
        <img
          src={iconUrl}
          alt="Icon"
          className="ml-2 rounded-full bg-white w-5 h-5"
        />
      )}
    </button>
  );
};

export default Button;
