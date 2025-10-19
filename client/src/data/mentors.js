const mentors = [
  {
    id: 1,
    name: "Alex Freshman",
    work: "Head of Phaselleus Vitae",
    photo: "../../../images/mentor-photo-1.png",
    email: "miccch@gmail.com",
    phone: "62822783647543",
    linkedin: "https://www.linkedin.com/in/muhammad-abdanul-ikhlas/",
    location: "United States of Majalengka",
    rating: "5.0",
    reviewers: 196,
    skills: ["Enterpreneurship", "Marketing", "Advertising", "Branding"],
    about:
      "Alex Freshman is an exceptional mentor who brings a wealth of experience  and enthusiasm to the mentoring program. With a solid background in mention relevant field or industry, Alex demonstrates a genuine  passion for guiding and supporting mentees in their personal and  professional development.",
    experiences: [
      {
        title:
          "Senior Copywriter | The Art of Digital Content | Anaheim, CA | 2018 – Present",
        description:
          "- Create high impact messaging for all marketing media, contributing to a 35% increase in revenue and market share. - Provide  editorial guidance to other four cross functinal departments, including  the marketing team, ensuring the delivery of top quality content. - Authored online display ads that drove click conversion rates of 2.35% in two months.",
      },
      {
        title:
          "Copywriter | The Art of Digital Content | Anaheim, CA | 2013 – 2018",
        description: "Edited  100+ pieces of content produced by senior executives, modifying the  text to conform to company wide branding standards and publication  guidelines. Wrote advertising copy for online content, adhering  to employers’ overarching brand identity and personality, and increasing  click through rates by 25%. Incorporated between 11.5k and 30.3k SEO keywords into copy to increase search result rankings, producing high conversion rates.",
      },
    ],
    mentees: [1, 2, 3],
    status: "Review",
    // ini ga usah bingung, pilih salah satu saja, mau make object atau array, prefer array aja
    course: ["Web Development", "Project Manager", "UI UX"],
    courses: [
      { value: "WebDevelopment", label: "Web Development" },
      { value: "PythonDevelopment", label: "Python Development" },
      { value: "Advertising", label: "Advertising" },
    ],
  },
  {
    id: 2,
    name: "David Morganson",
    work: "Staff of Cube Games",
    photo: "../../../images/mentor-photo-2.png",
    linkedin: "",
    location: "",
    rating: "4.9",
    reviewers: 87,
    skills: ["Enterpreneurship", "Marketing", "Branding", "Advertising"],
    about:
      "Alex Freshman is an exceptional mentor who brings a wealth of experience and enthusiasm to the mentoring program. With a solid background in mention relevant field or industry, Alex demonstrates a genuine passion for guiding and supporting mentees in their personal and professional development.",
    course: ["Web Development", "Project Manager", "UI UX"],
    status: "not my mentor", //bukan mentor saya
  },
  {
    id: 3,
    name: "Merry Juana",
    work: "Professional Developer",
    photo: "../../../images/mentor-photo-3.png",
    linkedin: "",
    location: "",
    rating: "5.0",
    reviewers: 196,
    skills: ["Enterpreneurship", "Marketing", "Branding", "Advertising"],
    about:
      "Alex Freshman is an exceptional mentor who brings a wealth of experience and enthusiasm to the mentoring program. With a solid background in mention relevant field or industry, Alex demonstrates a genuine passion for guiding and supporting mentees in their personal and professional development.",
    course: ["Web Development", "Project Manager", "UI UX"],
    status: "not my mentor", //bukan mentor saya
  },
  {
    id: 4,
    name: "Luke Handson",
    work: "Staff of Cube Games",
    photo: "../../../images/mentor-photo-4.png",
    linkedin: "",
    location: "",
    rating: "4.9",
    reviewers: 87,
    skills: ["Enterpreneurship", "Marketing", "Branding", "Advertising"],
    about:
      "Alex Freshman is an exceptional mentor who brings a wealth of experience and enthusiasm to the mentoring program. With a solid background in mention relevant field or industry, Alex demonstrates a genuine passion for guiding and supporting mentees in their personal and professional development.",
    course: ["Web Development", "Project Manager", "UI UX"],
    status: "not my mentor",
  },
  {
    id: 5,
    name: "Mike Newwest",
    work: "Staff of Cube Games",
    photo: "../../../images/mentor-photo-2.png",
    linkedin: "",
    location: "",
    rating: "4.9",
    reviewers: 87,
    skills: ["Enterpreneurship", "Marketing", "Branding", "Advertising"],
    about:
      "Alex Freshman is an exceptional mentor who brings a wealth of experience and enthusiasm to the mentoring program. With a solid background in mention relevant field or industry, Alex demonstrates a genuine passion for guiding and supporting mentees in their personal and professional development.",
    course: ["Web Development", "Project Manager", "UI UX"],
    status: "Done",
  },
];

export default mentors;
