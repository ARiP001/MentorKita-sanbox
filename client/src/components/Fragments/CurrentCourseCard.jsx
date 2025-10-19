import PropTypes from "prop-types";

const CurrentCourseCard = ({ name, status, image }) => {

  return (
    <main className="font-poppins mb-4 w-full shadow-cardShadow py-[10px] px-5 rounded-lg bg-[#ECF1FF] lg:py-4">
      <section className="flex gap-6 ">
        <div className="w-[97px] h-[97px] ">
          <img src={image} alt={name} className="rounded-[10px] object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-2 text-left ">
          <p className="text-base font-medium lg:text-xl">{name}</p>
          {/* menampilkan button dengan warna background sesuai dengan status nya */}
          <div
            className={`${
              status === "Waiting" ? "bg-[#27B2DD]" : "bg-[#081C87]"
            } text-white text-base font-bold w-36 py-2 text-center rounded-[10px]`}
          >
            {status}
          </div>
        </div>
      </section>
    </main>
  );
};

CurrentCourseCard.propTypes = {
  name: PropTypes.string,
  status: PropTypes.string,
  image: PropTypes.string,
};

export default CurrentCourseCard;
