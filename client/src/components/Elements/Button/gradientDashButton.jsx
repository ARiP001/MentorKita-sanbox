import PropTypes from "prop-types";

const GradientDashButton = ({ children }) => {
  
  return (
    <a href="#" target="_blank">
      <button
        className="text-sm p-1 py-[7px] rounded-[10px] lg:text-base lg:py-6"
        style={{
          backgroundImage: "linear-gradient(to right, #081C87, #27B2DD)",
          borderImage: "linear-gradient(to right, #081C87, #27B2DD)",
        }}
      >
        <span
          className="bg-blue-200 p-1 px-2 rounded-[8px] font-semibold text-[#081C87]
          hover:bg-transparent hover:text-white duration-300 lg:px-16 lg:py-[22px]"
        >
          {children}
        </span>
      </button>
    </a>
  );
};

GradientDashButton.propTypes = {
  children: PropTypes.string,
};

export default GradientDashButton;