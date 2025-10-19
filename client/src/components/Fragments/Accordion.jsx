import React, { useState } from "react";

const Accordion = ({title, content}) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => setAccordionOpen(!accordionOpen)}
          className="flex justify-between w-full items-center"
        >
          <div className="font-medium text-sm md:text-lg">{title}</div>
          <img
            src="../svg/arrow.svg"
            alt=""
            style={{
              transform: accordionOpen ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.2s ease-in-out'
            }}
          />
        </button>
      </div>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">{content}</div>
      </div>
    </>
  );
};

export default Accordion;
