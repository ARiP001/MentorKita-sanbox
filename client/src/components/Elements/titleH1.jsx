import PropTypes from "prop-types";
const TitleH1 = ({ title }) => {
  return (
    <div className="">
      <h2 className="font-medium text-[#020721] mt-5 mb-2 text-base lg:text-4xl lg:font-bold">
        {title}
      </h2>
    </div>
  );
};

TitleH1.propTypes = {
  title: PropTypes.string,
};

export default TitleH1;
