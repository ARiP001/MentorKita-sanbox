import PropTypes from "prop-types";

const SkillsSection = ({ skills ,customClass}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {skills.map((skill, index) => (
        <span
          key={index}
          className={`px-3 py-1 text-[8px]  font-medium rounded-full
          lg:text-base ${customClass}`}
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

SkillsSection.propTypes = {
  skills: PropTypes.array,
  customClass: PropTypes.string,
};

export default SkillsSection;
