import React from "react";
import resumePDF from "../assets/resume.pdf"; // Assuming you have a resume PDF

const DevInfo = () => {
	return (
		<section
			id="dev-info"
			className="dev-info hover:bg-gradient-to-b from-black via-slate-900 text-white py-16 hover:shadow-md hover:shadow-white hover:m-10"
		>
			<div className="container mx-auto px-4">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold mb-2">DevInfo</h1>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:ml-10">
					<div className="flex flex-col md:border-r border-gray-600 pr-8">
						<h2 className="text-sm lg:text-3xl font-bold mb-2">
							Md. Shahidul Islam
						</h2>
						<p className="text-sm md:text-lg mb-4 text-left">
							Software Engineer | MERN Enthusiast | DSA Devotee
						</p>
						<div>
							<h3 className="text-2xl font-bold mb-4">Skills</h3>
							<div className="text-gray-300 mb-">
								<p>React, React Router, HTML, Tailwind CSS, Bootstrap5</p>
								<p>
									JavaScript, C++, CSS3, Rest API, JWT, Firebase, react-redux,
									redux-toolkit
								</p>
								<p>
									MongoDB, Mongoose, Node JS, Express JS, Axios, Tan Stack Query
								</p>
								<p>
									Git, GitHub, Figma, Netlify, Vercel, VS Code, Chrome Dev Tools
								</p>
							</div>
						</div>
						<div className="mt-5">
							<a
								href="mailto:youremail@example.com"
								className="text-blue-500 hover:text-white"
							>
								📫 I am just one Mail away
							</a>
						</div>
					</div>
					<div className="flex flex-col space-y-4 ml-5">
						<div>
							<p className="text-xl font-bold mb-4">Check Out My Projects 👨‍💻</p>
							<ul className="list-disc space-y-4">
								<li>
									<a
										href="https://doctreat-8f71f.web.app/"
										target="_blank"
										rel="noreferrer"
										className="text-blue-500 hover:underline"
									>
										Epic Care (HealthCare)
									</a>
									<p className="text-gray-300">
										Secure admin & user dashboards, JWT token, data handling
									</p>
								</li>
								<li>
									<a
										href="https://kid-kingdom.web.app/"
										target="_blank"
										rel="noreferrer"
										className="text-blue-500 hover:underline"
									>
										Joyride (ToyCar)
									</a>
									<p className="text-gray-300">
										User management, sorting, Firebase authentication
									</p>
								</li>
								<li>
									<a
										href="https://chef-recipe-hunter-ec167.web.app/"
										target="_blank"
										rel="noreferrer"
										className="text-blue-500 hover:underline"
									>
										The Etalian Cusine Hub
									</a>
									<p className="text-gray-300">
										Authentication, recipes, error handling
									</p>
								</li>
							</ul>
						</div>
						<a
							href={resumePDF}
							download
							className="w-40 hover:border bg-gray-900 hover:bg-transparent rounded text-white font-bold py-2 px-4"
						>
							📄 My Resume
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DevInfo;
