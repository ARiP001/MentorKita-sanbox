import PropTypes from "prop-types";
const TitleH2 = ({ title }) => {
  return (
    <div className="">
      <h2 className="font-medium text-[#020721] mt-5 mb-2 text-base lg:text-2xl">{title}</h2>
    </div>
  );
};

TitleH2.propTypes = {
  title: PropTypes.string,
};

export default TitleH2;
