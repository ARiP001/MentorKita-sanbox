import PropTypes from "prop-types";
import TitleH2 from "../Elements/titleH2";

const ExperienceSection = ({ experiences }) => {
  return (
    <section className="mt-10 overflow-x-auto">
      <div className="px-6">
        <TitleH2 title="Experience" />
      </div>
      <section className="overflow-x-auto bg-[#ECF1FF]">
        <div className="flex">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="w-[151px] flex-shrink-0 flex items-center
              odd:flex-col-reverse even:flex-col"
            >
              {/* tahun */}
              <div className="flex flex-col justify-center items-center h-24 w-full">
                <span className="text-2xl font-bold text-[#3D5AF1]">
                  {experience.year}
                </span>
              </div>
              {/* bulat yang biru */}
              <div className="flex items-center justify-center my-2">
                <div className="w-16 border border-blue-500"></div>
                <img src="../../../svg/point.svg" alt="" />
                <div className="w-16 border border-blue-500"></div>
              </div>
              {/* deskripsi pengalaman */}
              <div className="w-full h-24 flex flex-col items-center text-wrap justify-center ">
                <p className="text-sm text-center w-[90%] text-ellipsis overflow-hidden ...">
                  {experience.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

ExperienceSection.propTypes = {
  experiences: PropTypes.array,
};

export default ExperienceSection;
