import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <div className="bg-gradient-to-r from-pink-200 to-pink-100 py-20 px-4">
      <h1 className="text-5xl font-bold text-pink-600 text-center mb-10">Get in Touch</h1>
      <p className="text-lg text-center mb-16">We're here to help! Reach out with any questions or feedback.</p>
      
      {/* Contact Form */}
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-pink-300 to-pink-100 p-8 rounded-lg shadow-lg">
        <form className="space-y-6">
          <div>
            <label className="block text-black text-lg font-semibold mb-2">Name</label>
            <input type="text" className="w-full p-3 rounded bg-white shadow focus:outline-none" />
          </div>
          <div>
            <label className="block text-black text-lg font-semibold mb-2">Email</label>
            <input type="email" className="w-full p-3 rounded bg-white shadow focus:outline-none" />
          </div>
          <div>
            <label className="block text-black text-lg font-semibold mb-2">Message</label>
            <textarea className="w-full p-3 rounded bg-white shadow focus:outline-none" rows="5"></textarea>
          </div>
          <button type="submit" className="bg-pink-600 text-white py-3 px-6 rounded-full hover:bg-pink-700 transition transform hover:scale-105">Send Message</button>
        </form>
      </div>

      {/* Contact Info */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold text-pink-600 mb-8">Our Contact Information</h2>
        <div className="flex justify-center space-x-12 text-black">
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" className="text-pink-600 mb-2" />
            <p>1234 PlanIt St, Suite 100<br />Productivity City, PC 12345</p>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faPhone} size="2x" className="text-pink-600 mb-2" />
            <p>(123) 456-7890</p>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faEnvelope} size="2x" className="text-pink-600 mb-2" />
            <p>support@planit.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
