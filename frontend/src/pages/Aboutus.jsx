import React from "react";
import { FaTasks, FaRobot, FaUsersCog, FaChartLine, FaClock } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";

const AboutUs = () => {
  return (
    <div className="about-us text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">About ScrumX</h1>
        <p className="max-w-3xl mx-auto text-lg">
          ScrumX is an AI-powered platform designed to **simulate and automate Scrum Master tasks**, 
          making agile project management smarter, faster, and more efficient.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-semibold mb-10">Our Mission & Vision</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
            <FaTasks className="text-indigo-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Mission</h3>
            <p>
              To empower agile teams by automating repetitive Scrum Master duties,
              enabling them to focus more on **innovation and delivery** rather than coordination overhead.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
            <FaChartLine className="text-purple-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Vision</h3>
            <p>
              To become the leading **AI-driven Scrum assistant**, trusted by organizations worldwide to 
              boost collaboration, transparency, and project success rates.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16 px-6 md:px-20">
        <h2 className="text-3xl font-semibold text-center mb-12">What ScrumX Automates</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition">
            <FaClock className="text-blue-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold">Daily Standups</h3>
            <p>Simulates daily Scrum meetings, collects team updates, and generates summaries automatically.</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition">
            <FaRobot className="text-green-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold">Sprint Planning</h3>
            <p>Assists in backlog prioritization, workload estimation, and sprint goal creation with AI insights.</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition">
            <MdOutlineSupportAgent className="text-red-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold">Retrospectives</h3>
            <p>Collects anonymous feedback and generates **actionable improvement reports** for the team.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-semibold mb-10">Meet Our Team</h2>
        <div className="grid md:grid-cols-4 gap-10">
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <img
              src="https://i.pravatar.cc/150?img=3"
              alt="Mohit S Kanyal"
              className="w-28 h-28 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-bold">Mohit S Kanyal</h3>
            <p className="text-sm text-gray-600">Founder & Developer</p>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <img
              src="https://i.pravatar.cc/150?img=7"
              alt="Dipesh H Jha"
              className="w-28 h-28 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-bold">Dipesh H Jha</h3>
            <p className="text-sm text-gray-600">Virtual Scrum Master</p>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <img
              src="https://i.pravatar.cc/150?img=4"
              alt="Aashish R Gupta"
              className="w-28 h-28 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-bold">Aashish R Gupta</h3>
            <p className="text-sm text-gray-600">Agile Innovator</p>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <img
              src="https://i.pravatar.cc/150?img=8"
              alt="Dixit K Jain"
              className="w-28 h-28 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-bold">Dixit K Jain</h3>
            <p className="text-sm text-gray-600">Scrum Operations Lead</p>
          </div>
        </div>
      </section>


      {/* Closing Section */}
      <section className="bg-indigo-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose ScrumX?</h2>
        <p className="max-w-2xl mx-auto mb-6">
          With ScrumX, teams save time, reduce manual overhead, and achieve **higher productivity** 
          through AI-driven Scrum automation. Let technology handle coordination while you focus on innovation!
        </p>
        <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition">
          Get Started with ScrumX
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
