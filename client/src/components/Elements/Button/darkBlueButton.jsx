import PropTypes from "prop-types";

// bisa di tambahkan handleOnClick
const DarkBlueButton = ({ type, customClass, children }) => {
  // const handleClick = () => {
  //   if (onClick) {
  //     onClick();
  //   }
  // };

  let buttonType;
  switch (type) {
    case "submit":
      buttonType = "submit";
      break;
    case "button":
      buttonType = "button";
      break;
    case "none":
      buttonType = "none";
      break;
    default:
      buttonType = "button";
  }

  return (
    <button
      type={buttonType}
      className={`hover:bg-[#27B2DD] bg-[#081C87] text-white text-base font-bold text-center rounded-[10px] duration-300 ${customClass}`}
      // onClick={handleClick}
    >
      {children}
    </button>
  );
};

DarkBlueButton.propTypes = {
  type: PropTypes.oneOf(["submit", "button", "none"]),
  customClass: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default DarkBlueButton;
