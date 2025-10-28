import PropTypes from "prop-types";

const CurrentCourseCard = ({ id, name, status, image, actionLabel, onAction }) => {

  return (
    <main className="font-poppins mb-4 w-full shadow-cardShadow py-3 px-4 rounded-lg bg-[#ECF1FF] lg:py-4">
      <section className="flex items-center gap-4">
        <div className="w-[64px] h-[64px] md:w-[80px] md:h-[80px]">
          <img src={image} alt={name} className="w-full h-full rounded-[10px] object-cover" />
        </div>
        <div className="flex-1 flex items-center justify-between gap-3">
          <div className="flex flex-col gap-1 text-left">
            <p className="text-sm md:text-base font-medium lg:text-xl truncate max-w-[260px] md:max-w-[360px]">{name}</p>
            <div
              className={`${status === "Waiting" ? "bg-[#27B2DD]" : status === "On Progress" ? "bg-[#081C87]" : "bg-gray-400"} text-white text-xs md:text-sm font-bold w-28 md:w-36 py-1.5 text-center rounded-[10px]`}
            >
              {status}
            </div>
          </div>
          {actionLabel && onAction ? (
            <button
              onClick={() => onAction(id)}
              className="shrink-0 px-3 py-2 md:px-4 md:py-2 rounded-md bg-[#081C87] text-white text-xs md:text-sm hover:bg-[#0a1f9e]"
            >
              {actionLabel}
            </button>
          ) : null}
        </div>
      </section>
    </main>
  );
};

CurrentCourseCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  status: PropTypes.string,
  image: PropTypes.string,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
};

export default CurrentCourseCard;
