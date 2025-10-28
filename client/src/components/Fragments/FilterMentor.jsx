import React from "react";
import courses from "../../data/courses";

const CourseCheckbox = ({ name, value, label, checked, onChange }) => (
  <div className="flex gap-1.5 justify-center self-start mt-2 whitespace-nowrap items-center">
    {" "}
    <input
      id={value}
      type="checkbox"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
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

const FilterMentor = ({addClass, addComp, onCourseChange, selectedCourses}) => {
  const handleCourseChange = (e) => {
    const courseValue = e.target.value;
    const isChecked = e.target.checked;
    if (onCourseChange) {
      onCourseChange(courseValue, isChecked);
    }
  };

  return (
    <section className={`${addClass} flex flex-col justify-center py-2.5 px-4 z-10 text-sm text-black bg-gray-200 rounded-xl shadow-sm max-w-[367px]`}>
      {" "}
      <h2 className="text-base font-semibold">Courses</h2>{" "}
      {courses.map((course) => (
        <CourseCheckbox
          key={course.value}
          name="courses"
          value={course.value}
          label={course.label}
          checked={selectedCourses?.includes(course.value) || false}
          onChange={handleCourseChange}
        />
      ))}{" "}
      {addComp}
    </section>
  );
}

export default FilterMentor;
