import React from 'react';
import { FaUsers, FaBullseye, FaHandsHelping } from 'react-icons/fa';

function AboutUs() {
  return (
    <div className="bg-gradient-to-r from-pink-200 to-pink-100 text-black py-10 px-5">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-pink-600 text-4xl font-bold mb-6">About Us</h1>
        <p className="mb-8">
          At PlanIt, we’re dedicated to helping you reach new heights in productivity and organization.
          Our mission is to make task management and planning effortless and enjoyable for individuals and teams.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {/* Mission Section */}
          <div className="flex flex-col items-center max-w-xs bg-gradient-to-r from-pink-300 to-pink-100 p-6 rounded-lg shadow-lg">
            <FaBullseye className="text-4xl text-black mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-pink-600">Our Mission</h2>
            <p className="text-black">
              To empower users with tools that streamline productivity and foster collaboration.
            </p>
          </div>

          {/* Values Section */}
          <div className="flex flex-col items-center max-w-xs bg-gradient-to-r from-pink-300 to-pink-100 p-6 rounded-lg shadow-lg">
            <FaHandsHelping className="text-4xl text-black mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-pink-600">Our Values</h2>
            <p className="text-black">
              We believe in innovation, transparency, and putting our users first.
            </p>
          </div>

          {/* Team Section */}
          <div className="flex flex-col items-center max-w-xs bg-gradient-to-r from-pink-300 to-pink-100 p-6 rounded-lg shadow-lg">
            <FaUsers className="text-4xl text-black mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-pink-600">Our Team</h2>
            <p className="text-black">
              A group of passionate professionals dedicated to improving your experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
