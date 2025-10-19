import PropTypes from "prop-types";
import StarRating from "../Elements/starRating";
const CardMentee = ({ mentee }) => {
  const { name, image, rating, comment, alumniCourse } = mentee;

  return (
    <main
      className="font-poppins mt-4 w-full  shadow-cardShadow pt-[20px] px-3 pb-1 rounded-lg 
    lg:w-[470px]"
    >
      <section className="flex gap-4  ">
        <div className="w-[80px] h-[80px] lg:w-[100px] lg:h-[100px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="p-4 text-left">
          <p className="text-base font-bold lg:text-2xl">{name}</p>
          {/* course yang di tampilkan di "course mentor" */}
          <p className="text-[10px] font-normal mb-1 lg:text-lg">
            {alumniCourse}
          </p>
          {/* menampilkan bintang sebanyak rating */}
          <StarRating rating={rating} />
        </div>
      </section>
      <section className="mt-3 text-justify text-xs italic pe-3 lg:pe-0 lg:text-base">
        <p>{`"${comment}"`}</p>
      </section>
    </main>
  );
};

CardMentee.propTypes = {
  mentee: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    rating: PropTypes.number,
    comment: PropTypes.string,
    alumniCourse: PropTypes.string,
  }),
};

export default CardMentee;
