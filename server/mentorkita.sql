-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2025 at 05:00 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mentorkita`
--

-- --------------------------------------------------------

--
-- Table structure for table `courserelationships`
--

CREATE TABLE `courserelationships` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `mentorId` int(11) DEFAULT NULL,
  `courseId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courserelationships`
--

INSERT INTO `courserelationships` (`id`, `createdAt`, `updatedAt`, `mentorId`, `courseId`) VALUES
(1, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 1, 3),
(2, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 2, 1),
(3, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 3, 2),
(4, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 4, 1),
(5, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 5, 1),
(6, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 6, 3),
(7, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 7, 4),
(8, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 8, 3),
(9, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 9, 2),
(10, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 10, 2),
(11, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 11, 2),
(12, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 12, 3),
(13, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 13, 3),
(14, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 14, 3),
(15, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 15, 1),
(16, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 16, 4),
(17, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 17, 4),
(18, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 18, 3),
(19, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 19, 4),
(20, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 20, 4),
(21, '2025-10-28 10:59:36', '2025-10-28 10:59:36', 1, 1),
(22, '2025-10-28 10:59:36', '2025-10-28 10:59:36', 2, 4),
(23, '2025-10-28 10:59:36', '2025-10-28 10:59:36', 10, 1),
(24, '2025-10-28 10:59:36', '2025-10-28 10:59:36', 12, 1),
(25, '2025-10-28 10:59:36', '2025-10-28 10:59:36', 19, 3),
(26, '2025-10-28 10:59:49', '2025-10-28 10:59:49', 3, 1),
(27, '2025-10-28 10:59:49', '2025-10-28 10:59:49', 3, 3),
(28, '2025-10-28 10:59:49', '2025-10-28 10:59:49', 4, 4),
(29, '2025-10-28 10:59:49', '2025-10-28 10:59:49', 5, 3),
(30, '2025-10-28 10:59:49', '2025-10-28 10:59:49', 5, 4),
(31, '2025-10-28 10:59:49', '2025-10-28 10:59:49', 6, 4),
(32, '2025-10-28 10:59:49', '2025-10-28 10:59:49', 6, 2),
(33, '2025-10-28 10:59:49', '2025-10-28 10:59:49', 7, 1),
(34, '2025-10-28 10:59:49', '2025-10-28 10:59:49', 7, 2),
(35, '2025-10-28 10:59:49', '2025-10-28 10:59:49', 8, 1),
(36, '2025-10-28 10:59:49', '2025-10-28 10:59:49', 9, 1),
(37, '2025-10-28 10:59:49', '2025-10-28 10:59:49', 11, 4),
(38, '2025-10-28 10:59:49', '2025-10-28 10:59:49', 11, 3),
(39, '2025-10-28 10:59:49', '2025-10-28 10:59:49', 15, 4),
(40, '2025-10-28 10:59:49', '2025-10-28 10:59:49', 16, 1);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `nama_course` enum('WEB DEV','MOBILE DEV','PROJECT MANAGER','UX DESIGN') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `nama_course`, `createdAt`, `updatedAt`) VALUES
(1, 'WEB DEV', '2025-10-27 16:44:09', '2025-10-27 16:44:09'),
(2, 'MOBILE DEV', '2025-10-27 16:44:09', '2025-10-27 16:44:09'),
(3, 'PROJECT MANAGER', '2025-10-27 16:44:09', '2025-10-27 16:44:09'),
(4, 'UX DESIGN', '2025-10-27 16:44:09', '2025-10-27 16:44:09');

-- --------------------------------------------------------

--
-- Table structure for table `experiences`
--

CREATE TABLE `experiences` (
  `id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `detail` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `mentorId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `experiences`
--

INSERT INTO `experiences` (`id`, `year`, `title`, `detail`, `createdAt`, `updatedAt`, `mentorId`) VALUES
(1, 2023, 'Senior Full-Stack Developer', 'Lead development of scalable web applications using React and Node.js, contributing to a 40% increase in user engagement and system performance. Provide technical guidance to a team of 8 developers, ensuring the delivery of high-quality code and adherence to best practices. Architected microservices solutions that improved application scalability and reduced deployment time by 60%.', '2025-01-15 09:30:00', '2025-01-15 09:30:00', 1),
(2, 2021, 'Technical Lead', 'Led technical architecture decisions for enterprise-level applications, resulting in improved system reliability and 50% faster response times. Mentored junior developers and conducted code reviews, maintaining high code quality standards across all projects. Implemented CI/CD pipelines using AWS services, reducing deployment errors by 75% and improving team productivity.', '2025-01-15 09:30:00', '2025-01-15 09:30:00', 1),
(3, 2019, 'Full-Stack Developer', 'Developed responsive web applications using modern JavaScript frameworks, increasing user satisfaction scores by 35%. Collaborated with cross-functional teams including designers and product managers to deliver user-centric solutions. Optimized database queries and implemented caching strategies, improving application performance by 45%.', '2025-01-15 09:30:00', '2025-01-15 09:30:00', 1),
(4, 2023, 'Senior Mobile Developer', 'Lead development of cross-platform mobile applications using React Native and Flutter, contributing to a 50% increase in app downloads and user retention rates. Provide technical guidance to a team of 5 mobile developers, ensuring the delivery of high-performance applications across iOS and Android platforms. Implemented advanced state management solutions and optimized app performance, reducing load times by 40% and improving user experience scores.', '2025-01-16 14:20:00', '2025-01-16 14:20:00', 2),
(5, 2021, 'Mobile Developer', 'Developed native and cross-platform mobile applications for startups and enterprise clients, increasing app store ratings by 35%. Collaborated with UI/UX designers to implement pixel-perfect designs and smooth user interactions. Specialized in React Native development, creating reusable components and implementing advanced navigation patterns that improved code maintainability by 60%.', '2025-01-16 14:20:00', '2025-01-16 14:20:00', 2),
(6, 2019, 'Junior Mobile Developer', 'Built mobile applications using React Native and Flutter frameworks, contributing to successful app launches with over 100,000 downloads. Worked closely with backend developers to integrate RESTful APIs and implement real-time features. Optimized app performance and memory usage, resulting in 30% faster app startup times and improved user satisfaction.', '2025-01-16 14:20:00', '2025-01-16 14:20:00', 2),
(7, 2022, 'Senior Backend Engineer', 'Architected scalable microservices solutions using Python and Django, improving system performance by 60%. Led backend development team of 8 engineers, implementing best practices for code quality and deployment automation. Designed and implemented RESTful APIs that serve over 1 million requests daily.', '2025-01-17 11:45:00', '2025-01-17 11:45:00', 3),
(8, 2020, 'Backend Developer', 'Developed robust backend services using Python and Django framework. Implemented database optimization strategies that reduced query response times by 40%. Collaborated with frontend teams to design efficient API endpoints and data structures.', '2025-01-17 11:45:00', '2025-01-17 11:45:00', 3),
(9, 2018, 'Junior Backend Developer', 'Started backend development career focusing on Python and web frameworks. Learned database design principles and API development. Contributed to small-scale web applications and gained experience in server-side programming.', '2025-01-17 11:45:00', '2025-01-17 11:45:00', 3),
(10, 2023, 'Senior Digital Marketing Manager', 'Led comprehensive digital marketing campaigns across multiple channels, contributing to a 60% increase in online revenue and market share for 50+ client companies. Provide strategic guidance to cross-functional teams including content creators, designers, and developers, ensuring the delivery of cohesive marketing strategies. Implemented data-driven SEO and SEM campaigns that achieved average click-through rates of 3.2% and improved search result rankings by 45%.', '2025-01-18 16:10:00', '2025-01-18 16:10:00', 4),
(11, 2021, 'Digital Marketing Manager', 'Developed and executed integrated marketing strategies for B2B and B2C clients, resulting in 40% increase in lead generation and 25% improvement in conversion rates. Managed social media campaigns across Facebook, Instagram, LinkedIn, and Twitter, growing average follower engagement by 55%. Analyzed marketing performance metrics using Google Analytics, Facebook Insights, and custom dashboards, providing actionable insights that improved campaign ROI by 35%.', '2025-01-18 16:10:00', '2025-01-18 16:10:00', 4),
(12, 2018, 'Marketing Coordinator', 'Coordinated marketing activities and content production for 30+ client accounts, ensuring brand consistency and message alignment across all digital touchpoints. Created compelling advertising copy for online campaigns, adhering to brand guidelines and increasing click-through rates by 30%. Conducted keyword research and implemented SEO strategies, improving organic search visibility and driving 50% more qualified traffic to client websites.', '2025-01-18 16:10:00', '2025-01-18 16:10:00', 4),
(13, 2022, 'Senior Project Manager', 'Led cross-functional teams of 15+ members across multiple product lines, delivering projects on time and within budget. Implemented agile methodologies including Scrum and Kanban, improving team productivity by 40%. Managed stakeholder relationships and conducted regular project reviews, ensuring alignment with business objectives and customer requirements.', '2025-01-19 08:30:00', '2025-01-19 08:30:00', 5),
(14, 2019, 'Project Manager', 'Managed multiple concurrent projects with budgets ranging from $50K to $500K. Coordinated with development, design, and QA teams to ensure seamless project delivery. Implemented project tracking tools and reporting systems that improved visibility and communication across all stakeholders.', '2025-01-19 08:30:00', '2025-01-19 08:30:00', 5),
(15, 2016, 'Project Coordinator', 'Supported project managers in planning and executing various initiatives. Created project documentation, tracked milestones, and facilitated team meetings. Gained experience in project management tools and methodologies while contributing to successful project completions.', '2025-01-19 08:30:00', '2025-01-19 08:30:00', 5),
(16, 2021, 'Senior UX/UI Designer', 'Led design initiatives for enterprise-level applications, creating intuitive user experiences that increased user engagement by 45%. Collaborated with product managers and developers to implement design systems and maintain consistency across all digital products. Conducted user research and usability testing to inform design decisions and improve user satisfaction.', '2025-01-20 13:15:00', '2025-01-20 13:15:00', 6),
(17, 2019, 'UX Designer', 'Designed user-centered interfaces for web and mobile applications, focusing on usability and accessibility. Created wireframes, prototypes, and user flows that guided development teams. Conducted user interviews and usability testing sessions to validate design concepts and iterate on solutions.', '2025-01-20 13:15:00', '2025-01-20 13:15:00', 6),
(18, 2017, 'UI Designer', 'Created visually appealing and functional user interfaces for various digital products. Collaborated with UX designers and developers to ensure design feasibility and implementation quality. Developed design guidelines and component libraries that improved design consistency across projects.', '2025-01-20 13:15:00', '2025-01-20 13:15:00', 6),
(19, 2020, 'Senior Software Architect', 'Architected cloud-native solutions using AWS, Docker, and Kubernetes, serving millions of users with 99.9% uptime. Led technical strategy for enterprise applications, making decisions on technology stack and system design. Mentored senior developers and conducted architecture reviews to ensure scalability and maintainability.', '2025-01-21 10:00:00', '2025-01-21 10:00:00', 7),
(20, 2017, 'Software Architect', 'Designed and implemented microservices architecture for large-scale applications. Collaborated with development teams to establish coding standards and best practices. Evaluated new technologies and frameworks to improve system performance and developer productivity.', '2025-01-21 10:00:00', '2025-01-21 10:00:00', 7),
(21, 2013, 'Software Developer', 'Developed enterprise applications using various programming languages and frameworks. Gained experience in full-stack development, database design, and system integration. Contributed to multiple projects while learning software architecture principles and best practices.', '2025-01-21 10:00:00', '2025-01-21 10:00:00', 7),
(22, 2023, 'Senior Frontend Developer', 'Led frontend development initiatives using React, Vue.js, and TypeScript, creating responsive and performant user interfaces. Implemented modern development practices including component-based architecture, state management, and automated testing. Mentored junior developers and conducted code reviews to maintain high code quality standards.', '2025-01-22 15:45:00', '2025-01-22 15:45:00', 8),
(23, 2021, 'Frontend Developer', 'Developed interactive web applications using modern JavaScript frameworks and libraries. Collaborated with designers to implement pixel-perfect user interfaces and with backend developers to integrate APIs. Optimized application performance and implemented responsive design principles for various screen sizes.', '2025-01-22 15:45:00', '2025-01-22 15:45:00', 8),
(24, 2019, 'Junior Frontend Developer', 'Started frontend development career focusing on HTML, CSS, and JavaScript. Learned modern frameworks and tools while contributing to various web projects. Gained experience in responsive design, cross-browser compatibility, and user interface best practices.', '2025-01-22 15:45:00', '2025-01-22 15:45:00', 8),
(25, 2019, 'Serial Entrepreneur', 'Founded and scaled multiple successful startups from concept to exit, generating over $10M in combined revenue. Led fundraising efforts, securing $2M in venture capital funding. Built and managed cross-functional teams of 20+ members, implementing agile methodologies and fostering innovation culture.', '2025-01-23 12:20:00', '2025-01-23 12:20:00', 9),
(26, 2016, 'Startup Founder', 'Launched first technology startup, developing innovative solutions for small businesses. Managed all aspects of business operations including product development, marketing, and customer acquisition. Successfully grew user base to 10,000+ active users and achieved profitability within 18 months.', '2025-01-23 12:20:00', '2025-01-23 12:20:00', 9),
(27, 2012, 'Business Development Manager', 'Led business development initiatives for technology companies, identifying new market opportunities and strategic partnerships. Developed go-to-market strategies and managed key client relationships. Gained experience in sales, marketing, and business strategy while building network in tech industry.', '2025-01-23 12:20:00', '2025-01-23 12:20:00', 9),
(28, 2024, 'Senior Full-Stack Developer', 'Led full-stack development projects using modern technologies including React, Node.js, and cloud platforms. Mentored junior developers and conducted technical interviews. Implemented DevOps practices including CI/CD pipelines and automated testing, improving development efficiency by 50%.', '2025-01-24 09:10:00', '2025-01-24 09:10:00', 10),
(29, 2022, 'Full-Stack Developer', 'Developed end-to-end web applications using various technologies and frameworks. Collaborated with cross-functional teams to deliver high-quality software solutions. Gained expertise in both frontend and backend development while learning cloud deployment and database optimization.', '2025-01-24 09:10:00', '2025-01-24 09:10:00', 10),
(30, 2020, 'Junior Developer', 'Started software development career with focus on web technologies. Learned programming fundamentals, version control, and collaborative development practices. Contributed to various projects while building foundation in software engineering principles and best practices.', '2025-01-24 09:10:00', '2025-01-24 09:10:00', 10);

-- --------------------------------------------------------

--
-- Table structure for table `komentars`
--

CREATE TABLE `komentars` (
  `id` int(11) NOT NULL,
  `body` varchar(255) NOT NULL,
  `menteeId` int(11) NOT NULL,
  `mentorId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `komentars`
--

INSERT INTO `komentars` (`id`, `body`, `menteeId`, `mentorId`, `createdAt`, `updatedAt`) VALUES
(1, 'James is an amazing mentor! His explanations are clear and he always takes time to answer my questions thoroughly. Highly recommended for anyone learning web development.', 1, 1, '2025-01-20 10:15:00', '2025-01-20 10:15:00'),
(2, 'Arif helped me understand React Native concepts that I struggled with for months. His practical approach and real-world examples made everything click!', 2, 2, '2025-01-22 14:30:00', '2025-01-22 14:30:00'),
(3, 'Lucas is a fantastic backend mentor. His knowledge of Python and Django is impressive, and he explains complex concepts in simple terms.', 3, 3, '2025-01-25 09:45:00', '2025-01-25 09:45:00'),
(4, 'Hiroshi transformed my understanding of digital marketing. His data-driven approach and practical insights helped me improve my campaigns significantly.', 4, 4, '2025-01-28 16:20:00', '2025-01-28 16:20:00'),
(5, 'David is an excellent project management mentor. His agile methodologies knowledge and leadership skills are outstanding. Learned so much!', 5, 5, '2025-01-30 11:10:00', '2025-01-30 11:10:00'),
(6, 'Daniel is a brilliant UX/UI designer. His design thinking approach and attention to user experience details are remarkable. Highly skilled mentor!', 6, 6, '2025-02-02 13:25:00', '2025-02-02 13:25:00'),
(7, 'Ravi is a true expert in software architecture. His knowledge of cloud technologies and system design is exceptional. Great mentor for senior developers.', 7, 7, '2025-02-05 08:40:00', '2025-02-05 08:40:00'),
(8, 'Michael helped me master React and modern JavaScript frameworks. His teaching style is engaging and he provides excellent code examples.', 8, 8, '2025-02-08 15:55:00', '2025-02-08 15:55:00'),
(9, 'Ethan is an inspiring entrepreneur mentor. His startup experience and business insights are invaluable. He helped me refine my business strategy.', 9, 9, '2025-02-10 12:30:00', '2025-02-10 12:30:00'),
(10, 'Dimas is a patient and knowledgeable full-stack mentor. He helped me understand the fundamentals and build my first complete web application.', 10, 10, '2025-02-12 10:15:00', '2025-02-12 10:15:00'),
(11, 'Emma is an excellent product manager mentor. Her user research techniques and product strategy insights are top-notch. Highly recommended!', 11, 11, '2025-02-14 14:45:00', '2025-02-14 14:45:00'),
(12, 'Siti helped me improve my digital marketing skills significantly. Her expertise in social media marketing and conversion optimization is impressive.', 12, 12, '2025-02-16 09:20:00', '2025-02-16 09:20:00'),
(13, 'Chloe is a talented UI/UX designer mentor. Her design system knowledge and prototyping skills helped me create better user interfaces.', 13, 13, '2025-02-18 16:35:00', '2025-02-18 16:35:00'),
(14, 'Hana is an expert QA mentor. Her automated testing knowledge and DevOps practices helped me improve my testing strategies significantly.', 14, 14, '2025-02-20 11:50:00', '2025-02-20 11:50:00'),
(15, 'Alicia is a creative brand strategist mentor. Her storytelling techniques and brand positioning insights are exceptional. Great mentor!', 15, 15, '2025-02-22 13:15:00', '2025-02-22 13:15:00'),
(16, 'Maria is a knowledgeable DevOps mentor. Her cloud infrastructure expertise and automation skills helped me understand DevOps practices better.', 16, 16, '2025-02-24 08:25:00', '2025-02-24 08:25:00'),
(17, 'Ayu is a passionate mobile developer mentor. Her React Native expertise and user-friendly approach made learning mobile development enjoyable.', 17, 17, '2025-02-26 15:40:00', '2025-02-26 15:40:00'),
(18, 'Sophia is an excellent UI designer mentor. Her design system knowledge and prototyping skills helped me create beautiful user interfaces.', 18, 18, '2025-02-28 12:05:00', '2025-02-28 12:05:00'),
(19, 'Emily is a fantastic agile coach mentor. Her project management expertise and team leadership skills are outstanding. Learned so much!', 19, 19, '2025-03-02 10:30:00', '2025-03-02 10:30:00'),
(20, 'Nadia is an expert cybersecurity mentor. Her security assessment knowledge and secure coding practices helped me understand cybersecurity better.', 20, 20, '2025-03-04 14:20:00', '2025-03-04 14:20:00');

-- --------------------------------------------------------

--
-- Table structure for table `mentees`
--

CREATE TABLE `mentees` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profilePict` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `about` text DEFAULT NULL,
  `role` enum('MENTEE','MENTOR') NOT NULL,
  `refreshToken` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mentees`
--

INSERT INTO `mentees` (`id`, `email`, `fullName`, `password`, `profilePict`, `phoneNumber`, `about`, `role`, `refreshToken`, `createdAt`, `updatedAt`) VALUES
(1, 'james.miller@email.com', 'James Miller', '$2b$10$example_hash_1', 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '+62 812-3456-7890', 'Fresh graduate looking to learn web development and build my career in tech industry', 'MENTEE', NULL, '2025-01-15 09:30:00', '2025-01-15 09:30:00'),
(2, 'arif.setiawan@email.com', 'Arif Setiawan', '$2b$10$example_hash_2', 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '+62 812-3456-7891', 'Computer science student passionate about mobile app development and UI/UX design', 'MENTEE', NULL, '2025-01-16 14:20:00', '2025-01-16 14:20:00'),
(3, 'lucas.johnson@email.com', 'Lucas Johnson', '$2b$10$example_hash_3', 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '+62 812-3456-7892', 'Junior developer wanting to improve my backend skills and learn about cloud technologies', 'MENTEE', NULL, '2025-01-17 11:45:00', '2025-01-17 11:45:00'),
(4, 'hiroshi.tanaka@email.com', 'Hiroshi Tanaka', '$2b$10$example_hash_4', 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '+62 812-3456-7893', 'Marketing professional transitioning to tech, interested in digital marketing and data analysis', 'MENTEE', NULL, '2025-01-18 16:10:00', '2025-01-18 16:10:00'),
(5, 'david.chen@email.com', 'David Chen', '$2b$10$example_hash_5', 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '+62 812-3456-7894', 'Business analyst looking to learn project management methodologies and agile practices', 'MENTEE', NULL, '2025-01-19 08:30:00', '2025-01-19 08:30:00'),
(6, 'daniel.garcia@email.com', 'Daniel Garcia', '$2b$10$example_hash_6', 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '+62 812-3456-7895', 'Design enthusiast wanting to master UX/UI design principles and user research methods', 'MENTEE', NULL, '2025-01-20 13:15:00', '2025-01-20 13:15:00'),
(7, 'ravi.kumar@email.com', 'Ravi Kumar', '$2b$10$example_hash_7', 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '+62 812-3456-7896', 'Software engineer seeking mentorship in advanced programming concepts and system architecture', 'MENTEE', NULL, '2025-01-21 10:00:00', '2025-01-21 10:00:00'),
(8, 'michael.brown@email.com', 'Michael Brown', '$2b$10$example_hash_8', 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '+62 812-3456-7897', 'Frontend developer interested in learning React Native and mobile development best practices', 'MENTEE', NULL, '2025-01-22 15:45:00', '2025-01-22 15:45:00'),
(9, 'ethan.wilson@email.com', 'Ethan Wilson', '$2b$10$example_hash_9', 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '+62 812-3456-7898', 'Entrepreneur looking to understand startup development and business strategy', 'MENTEE', NULL, '2025-01-23 12:20:00', '2025-01-23 12:20:00'),
(10, 'dimas.pratama@email.com', 'Dimas Pratama', '$2b$10$example_hash_10', 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '+62 812-3456-7899', 'Recent IT graduate eager to learn full-stack development and modern web technologies', 'MENTEE', NULL, '2025-01-24 09:10:00', '2025-01-24 09:10:00'),
(11, 'emma.davis@email.com', 'Emma Davis', '$2b$10$example_hash_11', 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '+62 812-3456-7900', 'Product manager wanting to deepen knowledge in user experience design and research', 'MENTEE', NULL, '2025-01-25 14:30:00', '2025-01-25 14:30:00'),
(12, 'siti.aisyah@email.com', 'Siti Aisyah', '$2b$10$example_hash_12', 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '+62 812-3456-7901', 'Digital marketing specialist interested in learning data analytics and conversion optimization', 'MENTEE', NULL, '2025-01-26 11:00:00', '2025-01-26 11:00:00'),
(13, 'chloe.martin@email.com', 'Chloe Martin', '$2b$10$example_hash_13', 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '+62 812-3456-7902', 'Graphic designer transitioning to UI/UX design, seeking guidance on design systems', 'MENTEE', NULL, '2025-01-27 16:15:00', '2025-01-27 16:15:00'),
(14, 'hana.sugimoto@email.com', 'Hana Sugimoto', '$2b$10$example_hash_14', 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '+62 812-3456-7903', 'Quality assurance engineer wanting to learn automated testing and DevOps practices', 'MENTEE', NULL, '2025-01-28 08:45:00', '2025-01-28 08:45:00'),
(15, 'alicia.rossi@email.com', 'Alicia Rossi', '$2b$10$example_hash_15', 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '+62 812-3456-7904', 'Content creator interested in learning brand strategy and digital marketing techniques', 'MENTEE', NULL, '2025-01-29 13:50:00', '2025-01-29 13:50:00'),
(16, 'maria.lopez@email.com', 'Maria Lopez', '$2b$10$example_hash_16', 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '+62 812-3456-7905', 'Backend developer seeking mentorship in microservices architecture and cloud deployment', 'MENTEE', NULL, '2025-01-30 10:25:00', '2025-01-30 10:25:00'),
(17, 'ayu.lestari@email.com', 'Ayu Lestari', '$2b$10$example_hash_17', 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '+62 812-3456-7906', 'Student majoring in information systems, passionate about learning mobile app development', 'MENTEE', NULL, '2025-01-31 15:40:00', '2025-01-31 15:40:00'),
(18, 'sophia.anderson@email.com', 'Sophia Anderson', '$2b$10$example_hash_18', 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '+62 812-3456-7907', 'Freelance designer looking to improve skills in user interface design and prototyping', 'MENTEE', NULL, '2025-02-01 12:05:00', '2025-02-01 12:05:00'),
(19, 'emily.clark@email.com', 'Emily Clark', '$2b$10$example_hash_19', 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '+62 812-3456-7908', 'Project coordinator wanting to learn agile methodologies and team leadership skills', 'MENTEE', NULL, '2025-02-02 09:30:00', '2025-02-02 09:30:00'),
(20, 'nadia.putri@email.com', 'Nadia Putri', '$2b$10$example_hash_20', 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '+62 812-3456-7909', 'Junior developer interested in learning cybersecurity and secure coding practices', 'MENTEE', NULL, '2025-02-03 14:20:00', '2025-02-03 14:20:00'),
(21, 'adminmentor@gmail.com', 'Admin MENTOR', '$2b$10$./Ardcx4AFQfAPWeU7bGAuwVkB1AleY8wJerWzal4Njp4pNlPQxGy', NULL, NULL, NULL, 'MENTEE', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxLCJpYXQiOjE3NjE2MjM2MzgsImV4cCI6MTc2MjIyODQzOH0.NxR8YoPufgo5hzXyUYuEnCac6qqg5hZeyG4RJDLDDRc', '2025-10-28 03:53:58', '2025-10-28 03:53:58'),
(22, 'adminmentee@gmail.com', 'Admin MENTEE', '$2b$10$ou6wnhOuoX14uL1gwJ1sKO7QlLUm3hPKsdM4H9KrSXuwKBde9ujXS', NULL, NULL, NULL, 'MENTEE', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyLCJpYXQiOjE3NjE2MjM2OTIsImV4cCI6MTc2MjIyODQ5Mn0.aBJYZGqTwZjAxcj8_kd6lpk5I8_zmvm0c2-cilAQcQ0', '2025-10-28 03:54:52', '2025-10-28 03:54:52');

-- --------------------------------------------------------

--
-- Table structure for table `mentors`
--

CREATE TABLE `mentors` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `about` text DEFAULT NULL,
  `job` varchar(255) DEFAULT NULL,
  `lokasi` varchar(255) DEFAULT NULL,
  `rating` double NOT NULL,
  `profilePict` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `menteeId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mentors`
--

INSERT INTO `mentors` (`id`, `fullName`, `phoneNumber`, `email`, `about`, `job`, `lokasi`, `rating`, `profilePict`, `createdAt`, `updatedAt`, `menteeId`) VALUES
(1, 'James Miller', '+62 899-1234-5678', 'james.miller@email.com', 'James Miller is an exceptional mentor who brings a wealth of experience and enthusiasm to the mentoring program. With a solid background in full-stack development and cloud technologies, James demonstrates a genuine passion for guiding and supporting mentees in their personal and professional development. His expertise spans across React, Node.js, AWS, and modern web development practices, making him an invaluable resource for aspiring developers looking to build scalable applications and advance their careers in the tech industry.', 'Senior Software Engineer', 'Jakarta', 4.9, 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '2025-01-15 09:30:00', '2025-01-15 09:30:00', 1),
(2, 'Arif Setiawan', '+62 899-1234-5679', 'arif.setiawan@email.com', 'Arif Setiawan is an exceptional mentor who brings a wealth of experience and enthusiasm to the mentoring program. With a solid background in mobile application development and cross-platform technologies, Arif demonstrates a genuine passion for guiding and supporting mentees in their personal and professional development. His expertise spans across React Native, Flutter, iOS, and Android development, making him an invaluable resource for aspiring mobile developers looking to build innovative applications and advance their careers in the mobile tech industry.', 'Mobile Developer', 'Bandung', 4.7, 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '2025-01-16 14:20:00', '2025-01-16 14:20:00', 2),
(3, 'Lucas Johnson', '+62 899-1234-5680', 'lucas.johnson@email.com', 'Backend Engineer with expertise in Python, Django, and microservices architecture. 7 years experience in building scalable web applications and APIs.', 'Backend Developer', 'Surabaya', 4.2, 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '2025-01-17 11:45:00', '2025-01-17 11:45:00', 3),
(4, 'Hiroshi Tanaka', '+62 899-1234-5681', 'hiroshi.tanaka@email.com', 'Hiroshi Tanaka is an exceptional mentor who brings a wealth of experience and enthusiasm to the mentoring program. With a solid background in digital marketing and data analytics, Hiroshi demonstrates a genuine passion for guiding and supporting mentees in their personal and professional development. His expertise spans across SEO, SEM, social media marketing, content strategy, and conversion optimization, making him an invaluable resource for aspiring marketers looking to build successful digital campaigns and advance their careers in the marketing industry.', 'Digital Marketing Manager', 'Yogyakarta', 4.6, 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '2025-01-18 16:10:00', '2025-01-18 16:10:00', 4),
(5, 'David Chen', '+62 899-1234-5682', 'david.chen@email.com', 'With over 9 years of experience in project management and agile methodologies, David has successfully led cross-functional teams across various tech companies. His expertise in Scrum, Kanban, and Lean methodologies has helped organizations improve their delivery efficiency by 40% on average. David is passionate about mentoring aspiring project managers and sharing practical insights on team leadership, stakeholder management, and agile transformation strategies.', 'Project Manager', 'Medan', 4.5, 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '2025-01-19 08:30:00', '2025-01-19 08:30:00', 5),
(6, 'Daniel Garcia', '+62 899-1234-5683', 'daniel.garcia@email.com', 'Daniel brings 8 years of creative expertise to the table, specializing in user experience and interface design. Having worked with both startups and Fortune 500 companies, he has a proven track record of creating intuitive designs that drive user engagement. His portfolio includes award-winning mobile apps and web platforms that have collectively served over 2 million users. Daniel loves sharing his knowledge about design thinking, user research methodologies, and the latest design tools with aspiring designers.', 'UX/UI Designer', 'Semarang', 4.8, 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '2025-01-20 13:15:00', '2025-01-20 13:15:00', 6),
(7, 'Ravi Kumar', '+62 899-1234-5684', 'ravi.kumar@email.com', 'Meet Ravi, a seasoned software architect with 12+ years of experience building enterprise-grade systems. His journey spans from writing his first line of code to architecting cloud-native solutions that serve millions of users. Ravi has deep expertise in AWS, Docker, Kubernetes, and microservices architecture. He\'s passionate about mentoring developers who want to transition from coding to system design and architecture. His practical approach to complex technical challenges makes him an excellent mentor for senior developers looking to level up their skills.', 'Software Architect', 'Makassar', 4.9, 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '2025-01-21 10:00:00', '2025-01-21 10:00:00', 7),
(8, 'Michael Brown', '+62 899-1234-5685', 'michael.brown@email.com', 'Michael is a frontend enthusiast who fell in love with JavaScript and never looked back. Over 6 years, he has mastered React, Vue.js, and TypeScript, building everything from simple landing pages to complex single-page applications. His attention to detail and passion for clean code has earned him recognition in the developer community. Michael enjoys breaking down complex frontend concepts into digestible lessons and helping newcomers navigate the ever-evolving world of web development.', 'Frontend Developer', 'Palembang', 4.1, 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '2025-01-22 15:45:00', '2025-01-22 15:45:00', 8),
(9, 'Ethan Wilson', '+62 899-1234-5686', 'ethan.wilson@email.com', 'Ethan\'s entrepreneurial journey began with a simple idea and $500 in savings. Today, he\'s a serial entrepreneur with 3 successful exits under his belt, having built companies from ground zero to multi-million dollar valuations. His expertise spans business strategy, fundraising, team building, and scaling operations. Ethan believes in the power of mentorship and has personally guided over 50 startups through their growth phases. He\'s passionate about helping aspiring entrepreneurs turn their ideas into profitable businesses.', 'Entrepreneur', 'Bali', 4.4, 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '2025-01-23 12:20:00', '2025-01-23 12:20:00', 9),
(10, 'Dimas Pratama', '+62 899-1234-5687', 'dimas.pratama@email.com', 'Dimas started his coding journey as a self-taught developer, learning from online tutorials and building projects in his spare time. Today, he\'s a full-stack developer with 5 years of experience who loves sharing his knowledge with others. His teaching approach focuses on practical, hands-on learning rather than theoretical concepts. Dimas has helped over 100 students land their first developer jobs and continues to mentor junior developers in his community.', 'Full-Stack Developer', 'Jakarta', 4.6, 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '2025-01-24 09:10:00', '2025-01-24 09:10:00', 10),
(11, 'Emma Davis', '+62 899-1234-5688', 'emma.davis@email.com', 'Product Manager with 7 years experience in SaaS products. Expert in user research, product strategy, and data-driven decision making.', 'Product Manager', 'Bandung', 4.3, 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '2025-01-25 14:30:00', '2025-01-25 14:30:00', 11),
(12, 'Siti Aisyah', '+62 899-1234-5689', 'siti.aisyah@email.com', 'Digital Marketing Specialist with expertise in social media marketing, content strategy, and conversion optimization. 8 years experience growing online businesses.', 'Digital Marketing Specialist', 'Surabaya', 4.7, 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '2025-01-26 11:00:00', '2025-01-26 11:00:00', 12),
(13, 'Chloe Martin', '+62 899-1234-5690', 'chloe.martin@email.com', 'UI/UX Designer with 6 years experience in creating beautiful and functional designs. Expert in Figma, Adobe Creative Suite, and design thinking methodologies.', 'UI/UX Designer', 'Yogyakarta', 4.1, 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '2025-01-27 16:15:00', '2025-01-27 16:15:00', 13),
(14, 'Hana Sugimoto', '+62 899-1234-5691', 'hana.sugimoto@email.com', 'QA Engineer with 8 years experience in automated testing, test automation frameworks, and DevOps practices. Expert in Selenium, Cypress, and CI/CD pipelines.', 'QA Engineer', 'Medan', 4.5, 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '2025-01-28 08:45:00', '2025-01-28 08:45:00', 14),
(15, 'Alicia Rossi', '+62 899-1234-5692', 'alicia.rossi@email.com', 'Brand Strategist and Content Creator with 9 years experience in building brand identities and creating engaging content. Expert in storytelling and brand positioning.', 'Brand Strategist', 'Semarang', 4.1, 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '2025-01-29 13:50:00', '2025-01-29 13:50:00', 15),
(16, 'Maria Lopez', '+62 899-1234-5693', 'maria.lopez@email.com', 'DevOps Engineer with 10 years experience in cloud infrastructure, containerization, and automation. Expert in AWS, Azure, Docker, and Kubernetes.', 'DevOps Engineer', 'Makassar', 4.2, 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '2025-01-30 10:25:00', '2025-01-30 10:25:00', 16),
(17, 'Ayu Lestari', '+62 899-1234-5694', 'ayu.lestari@email.com', 'Mobile App Developer with 5 years experience in React Native and Flutter. Passionate about creating user-friendly mobile applications and sharing knowledge.', 'Mobile Developer', 'Palembang', 4.5, 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '2025-01-31 15:40:00', '2025-01-31 15:40:00', 17),
(18, 'Sophia Anderson', '+62 899-1234-5695', 'sophia.anderson@email.com', 'UI Designer with 7 years experience in creating intuitive and beautiful user interfaces. Expert in design systems, prototyping, and user-centered design principles.', 'UI Designer', 'Bali', 4.6, 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '2025-02-01 12:05:00', '2025-02-01 12:05:00', 18),
(19, 'Emily Clark', '+62 899-1234-5696', 'emily.clark@email.com', 'Agile Coach and Project Manager with 11 years experience in agile methodologies, team leadership, and organizational transformation.', 'Agile Coach', 'Jakarta', 4.3, 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '2025-02-02 09:30:00', '2025-02-02 09:30:00', 19),
(20, 'Nadia Putri', '+62 899-1234-5697', 'nadia.putri@email.com', 'Cybersecurity Expert with 8 years experience in security assessment, penetration testing, and secure coding practices. Expert in ethical hacking and security protocols.', 'Cybersecurity Expert', 'Bandung', 4.3, 'https://res.cloudinary.com/djj4uk4yt/image/upload/v1761581350/Profile_Member/user_8.jpg', '2025-02-03 14:20:00', '2025-02-03 14:20:00', 20);

-- --------------------------------------------------------

--
-- Table structure for table `saveds`
--

CREATE TABLE `saveds` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `menteeId` int(11) DEFAULT NULL,
  `mentorId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `saveds`
--

INSERT INTO `saveds` (`id`, `createdAt`, `updatedAt`, `menteeId`, `mentorId`) VALUES
(1, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 1, 16),
(2, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 2, 17),
(3, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 3, 9),
(4, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 4, 19),
(5, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 5, 4),
(6, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 6, 13),
(7, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 7, 12),
(8, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 8, 18),
(9, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 9, 2),
(10, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 10, 18),
(11, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 11, 4),
(12, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 12, 11),
(13, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 13, 6),
(14, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 14, 12),
(15, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 15, 3),
(16, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 16, 12),
(17, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 17, 2),
(18, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 18, 2),
(19, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 19, 14),
(20, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 20, 4);

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `id` int(11) NOT NULL,
  `nama_skills` enum('Advertising','Branding','Back-End Development','Front-End Development','Enterpreneurship','Marketing','Project Managering','UX Designer') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `nama_skills`, `createdAt`, `updatedAt`) VALUES
(1, 'Advertising', '2025-10-27 16:44:09', '2025-10-27 16:44:09'),
(2, 'Branding', '2025-10-27 16:44:09', '2025-10-27 16:44:09'),
(3, 'Back-End Development', '2025-10-27 16:44:09', '2025-10-27 16:44:09'),
(4, 'Front-End Development', '2025-10-27 16:44:09', '2025-10-27 16:44:09'),
(5, 'Enterpreneurship', '2025-10-27 16:44:09', '2025-10-27 16:44:09'),
(6, 'Marketing', '2025-10-27 16:44:09', '2025-10-27 16:44:09'),
(7, 'Project Managering', '2025-10-27 16:44:09', '2025-10-27 16:44:09'),
(8, 'UX Designer', '2025-10-27 16:44:09', '2025-10-27 16:44:09');

-- --------------------------------------------------------

--
-- Table structure for table `skillsrelationships`
--

CREATE TABLE `skillsrelationships` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `mentorId` int(11) DEFAULT NULL,
  `skillId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `skillsrelationships`
--

INSERT INTO `skillsrelationships` (`id`, `createdAt`, `updatedAt`, `mentorId`, `skillId`) VALUES
(1, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 1, 8),
(2, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 1, 2),
(3, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 2, 6),
(4, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 2, 3),
(5, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 3, 8),
(6, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 3, 3),
(7, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 4, 2),
(8, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 4, 1),
(9, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 5, 3),
(10, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 5, 4),
(11, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 6, 8),
(12, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 6, 2),
(13, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 7, 7),
(14, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 7, 5),
(15, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 8, 6),
(16, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 8, 7),
(17, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 9, 7),
(18, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 9, 6),
(19, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 10, 1),
(20, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 10, 8),
(21, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 11, 8),
(22, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 11, 7),
(23, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 12, 5),
(24, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 12, 3),
(25, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 13, 1),
(26, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 13, 7),
(27, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 14, 4),
(28, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 14, 6),
(29, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 15, 1),
(30, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 15, 7),
(31, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 16, 3),
(32, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 16, 8),
(33, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 17, 2),
(34, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 17, 8),
(35, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 18, 4),
(36, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 18, 2),
(37, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 19, 2),
(38, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 19, 3),
(39, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 20, 8),
(40, '2025-10-27 16:44:09', '2025-10-27 16:44:09', 20, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courserelationships`
--
ALTER TABLE `courserelationships`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `courseRelationships_courseId_mentorId_unique` (`mentorId`,`courseId`),
  ADD KEY `courseId` (`courseId`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mentorId` (`mentorId`);

--
-- Indexes for table `komentars`
--
ALTER TABLE `komentars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menteeId` (`menteeId`),
  ADD KEY `mentorId` (`mentorId`);

--
-- Indexes for table `mentees`
--
ALTER TABLE `mentees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `mentors`
--
ALTER TABLE `mentors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menteeId` (`menteeId`);

--
-- Indexes for table `saveds`
--
ALTER TABLE `saveds`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `saveds_mentorId_menteeId_unique` (`menteeId`,`mentorId`),
  ADD KEY `mentorId` (`mentorId`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skillsrelationships`
--
ALTER TABLE `skillsrelationships`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `skillsRelationships_skillId_mentorId_unique` (`mentorId`,`skillId`),
  ADD KEY `skillId` (`skillId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courserelationships`
--
ALTER TABLE `courserelationships`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `experiences`
--
ALTER TABLE `experiences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `komentars`
--
ALTER TABLE `komentars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `mentees`
--
ALTER TABLE `mentees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `mentors`
--
ALTER TABLE `mentors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `saveds`
--
ALTER TABLE `saveds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `skillsrelationships`
--
ALTER TABLE `skillsrelationships`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courserelationships`
--
ALTER TABLE `courserelationships`
  ADD CONSTRAINT `courserelationships_ibfk_1` FOREIGN KEY (`mentorId`) REFERENCES `mentors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `courserelationships_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `experiences`
--
ALTER TABLE `experiences`
  ADD CONSTRAINT `experiences_ibfk_1` FOREIGN KEY (`mentorId`) REFERENCES `mentors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `komentars`
--
ALTER TABLE `komentars`
  ADD CONSTRAINT `komentars_ibfk_1` FOREIGN KEY (`menteeId`) REFERENCES `mentees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `komentars_ibfk_2` FOREIGN KEY (`mentorId`) REFERENCES `mentors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `mentors`
--
ALTER TABLE `mentors`
  ADD CONSTRAINT `mentors_ibfk_1` FOREIGN KEY (`menteeId`) REFERENCES `mentees` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `saveds`
--
ALTER TABLE `saveds`
  ADD CONSTRAINT `saveds_ibfk_1` FOREIGN KEY (`menteeId`) REFERENCES `mentees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `saveds_ibfk_2` FOREIGN KEY (`mentorId`) REFERENCES `mentors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `skillsrelationships`
--
ALTER TABLE `skillsrelationships`
  ADD CONSTRAINT `skillsrelationships_ibfk_1` FOREIGN KEY (`mentorId`) REFERENCES `mentors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `skillsrelationships_ibfk_2` FOREIGN KEY (`skillId`) REFERENCES `skills` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
