import React from "react";
import courses from "../../data/courses";

const CourseCheck = ({ course }) => (
  <div className="flex gap-1.5 justify-center self-start mt-2 items-center">
    <input
      id={course.value}
      type="checkbox"
      name="Course"
      value={course.value}
      className="box-border flex relative flex-col shrink-0 p-2.5 rounded border border-solid border-stone-300 my-auto"
    />
    <label
      htmlFor={course.value}
      className="text-xs shrink-0 ml-2"
    >
      <p>{course.label}</p>
    </label>
  </div>
);

const CourseCheckbox = () => {
  return (
    <div>
      <div className="flex flex-col pl-4">
        {courses.map((course, index) => (
          <CourseCheck
            key={index}
            course={course}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseCheckbox;
