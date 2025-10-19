import React from "react";
import skills from "../../data/skills";

const SkillCheckbox = ({ name, value, label }) => (
  <div className="flex gap-1.5 justify-center self-start mt-2 whitespace-nowrap items-center">
    {" "}
    <input
      id={value}
      type="checkbox"
      name={name}
      value={value}
      className="box-border flex relative flex-col shrink-0 p-2.5 rounded border border-solid border-stone-300 my-auto"
    />{" "}
    <label
      htmlFor={value}
      className="box-border flex relative flex-col shrink-0 ml-2"
    >
      {" "}
      <p>{label}</p>{" "}
    </label>{" "}
  </div>
);

const FilterMentor = ({addClass, addComp}) => {
  return (
    <section className={`${addClass} flex flex-col justify-center py-2.5 px-4 z-10 text-sm text-black bg-gray-200 rounded-xl shadow-sm max-w-[367px]`}>
      {" "}
      <h2 className="text-base font-semibold">Skills</h2>{" "}
      {skills.map((skill) => (
        <SkillCheckbox
          key={skill.value}
          name="skills"
          value={skill.value}
          label={skill.label}
        />
      ))}{" "}
      {addComp}
    </section>
  );
}

export default FilterMentor;
