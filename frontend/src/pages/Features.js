import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faBell, faChartLine, faUsers } from '@fortawesome/free-solid-svg-icons';

const Features = () => {
  const features = [
    { icon: faTasks, title: 'Task Management', description: 'Easily create, categorize, and manage your tasks to stay organized.' },
    { icon: faBell, title: 'Reminders', description: 'Set customizable reminders to meet all your deadlines effortlessly.' },
    { icon: faChartLine, title: 'Performance Tracking', description: 'Track your productivity with detailed charts and progress reports.' },
    { icon: faUsers, title: 'Collaboration', description: 'Share tasks with team members and manage projects together.' },
  ];

  return (
    <div className="py-20 px-4">
      <h1 className="text-5xl font-bold text-pink-600 text-center mb-10">Discover the Powerful Features of PlanIt</h1>
      <p className="text-lg text-center mb-16">Boost your productivity with tools designed to help you plan and achieve more.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="bg-gradient-to-r from-pink-300 to-pink-100 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition">
            <div className="bg-pink-600 text-white p-4 rounded-full inline-block mb-4">
              <FontAwesomeIcon icon={feature.icon} size="2x" />
            </div>
            <h3 className="text-2xl font-semibold text-black mb-2">{feature.title}</h3>
            <p className="text-black">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
