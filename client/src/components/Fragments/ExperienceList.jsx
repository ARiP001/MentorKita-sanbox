import React from "react";

const ExperienceList = ({ experiences }) => (
  <div>
    <table>
      <tbody>
        {experiences.map((experience, index) => (
          <tr key={index}>
            <td className="font-semibold">{experience.year}</td>
            <td>:</td>
            <td>{experience.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ExperienceList;
