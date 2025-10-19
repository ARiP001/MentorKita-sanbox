import SkyBlueBtn from "../Elements/Button/skyBlueBtn";

const SubmissionSuccess = ({ onClose, statusChecked }) => {

  const handleClose = (e) => {
    if (e.target.id === "wrapper2") onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      id="wrapper2"
      onClick={handleClose}
    >
      <div className="relative w-80 h-48 bg-white rounded-lg shadow-2xl flex-col justify-center items-center flex">
        <div className="flex justify-center">
          <div className="w-10 h-10 bg-emerald-600 bg-opacity-10 rounded-full" />
          <img
            src="../svg/check.svg"
            alt=""
            className="w-6 h-6 absolute top-9"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-3 mt-8">
          {statusChecked === 1 ? (
            <div className="self-stretch text-center text-zinc-700 text-sm font-normal">
              Submission Success!
            </div>
          ) : statusChecked === 2 ? (
            <>
              <div className="self-stretch text-center text-zinc-700 text-sm font-normal">
                Registration Success!
              </div>
              <div className="self-stretch text-center text-zinc-700 text-sm font-normal">
                You are a mentor
              </div>
            </>
          ) : null}
          <div onClick={() => onClose()}>
            <SkyBlueBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
