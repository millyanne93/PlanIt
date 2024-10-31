import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import 'swiper/css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import heroBackground from '../assets/images/hero-background.webp';
import actionBackground from '../assets/images/action.webp';
import Features from './Features';
import { faBullseye, faHandshake, faUser, faChartPie } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  return (
    <div>
      {/* Sticky Navbar */}
      <nav className="fixed top-0 w-full bg-white shadow-lg z-50">
        <div className="container mx-auto flex justify-between items-center py-4">
          <Link to="/" className="text-pink-700 text-2xl font-bold">PlanIt</Link>
          <div className="space-x-4">
            <Link to="/features" className="hover:text-pink-600 transition">Features</Link>
            <Link to="/pricing" className="hover:text-pink-600 transition">Pricing</Link>
            <Link to="/contact" className="hover:text-pink-600 transition">Contact</Link>
            <Link to="/login" className="hover:text-pink-600 transition">Login</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Gradient Background */}
      <header
        className="relative h-screen text-center flex flex-col justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.7)"
        }}
      >
        <div className="relative z-10 text-white">
          <h1 className="text-6xl font-bold mb-4">Plan It. Do It. Achieve It!</h1>
          <p className="text-lg mb-6">Streamline your tasks and get more done with your personal task management tool.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/signup" className="bg-pink-600 text-white px-8 py-3 rounded-full flex items-center hover:bg-pink-700 transition transform hover:scale-105">
              <i className="fas fa-play-circle mr-2"></i> Get Started
            </Link>
            <Link to="/demo" className="bg-white text-pink-600 border border-pink-600 px-8 py-3 rounded-full flex items-center hover:bg-pink-100 transition transform hover:scale-105">
              <i className="fas fa-video mr-2"></i> Watch Demo
            </Link>
          </div>
        </div>
      </header>
      {/* Replace Overview Section with Features Component */}
      <section className="features py-16 bg-gradient-to-r from-pink-200 to-pink-100">
        <Features />
      </section> 

      {/* Benefits Section */}
      <section className="benefits bg-gradient-to-r from-pink-200 to-pink-100">
        <h2 className="text-pink-600 text-4xl font-bold text-center mb-8">Why Choose PlanIt?</h2>
        <div className="container mx-auto flex flex-wrap justify-center gap-8 bg-gradient-to-r from-pink-200 to-pink-100">
          {[
            {
              icon: faBullseye,
              title: 'Enhanced Focus & Efficiency',
              description: 'PlanIt is designed to streamline your workflow, helping you stay focused on priorities and reduce distractions for higher efficiency.',
            },
            {
              icon: faHandshake,
              title: 'Seamless Collaboration',
              description: 'Bring teams together with easy sharing and communication features, ensuring everyone is aligned and progress is transparent.',
            },
            {
              icon: faChartPie,
              title: 'Data-Driven Insights',
              description: 'Use performance data and insights to improve productivity, spot trends, and make informed decisions.',
            },
          ].map((benefit, index) => (
            <div key={index} className="flex items-center space-x-4 p-4">
              <FontAwesomeIcon icon={benefit.icon} className="text-pink-600 text-3xl" />
              <div>
                <h3 className="text-black font-semibold text-lg">{benefit.title}</h3>
                <p className="text-gray-700 text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials bg-gradient-to-r from-pink-200 to-pink-100 py-16">
        <h2 className="text-pink-600 text-4xl font-bold text-center mb-8">What Our Users Say</h2>
        <Swiper slidesPerView={1} spaceBetween={10} pagination={{ clickable: true }}>
          {[
            { name: 'John Doe', review: 'This app transformed how I manage tasks! I definitely recommend!', image: '/path/to/john.jpg', rating: 5 },
            { name: 'Jane Smith', review: 'Task management has never been easier!', image: '/path/to/jane.jpg', rating: 4 },
          ].map((testimonial, index) => (
            <SwiperSlide key={index}>
              {/* Boxed testimonial with gradient */}
              <div className="bg-gradient-to-r from-pink-500 via-pink-300 to-pink-200 shadow-lg rounded-lg p-6 flex items-center gap-4 max-w-md mx-auto">
                <FontAwesomeIcon icon={faUser} className="text-white text-3xl" />
                <div>
                  <h3 className="text-pink-900 font-semibold">{testimonial.name}</h3>
                  <p className="text-black-100">{testimonial.review}</p>
                  <div className="text-yellow-400">
                    {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Call to Action */}
      <section
        className="cta py-16 text-center text-white"
        style={{
          backgroundImage: `url(${actionBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay', // Softens image with the background color
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}
      >
        <h2 className="text-3xl font-bold mb-4">Join Thousands of Users Improving Their Productivity!</h2>
        <p className="mb-6">Sign up today and start organizing your tasks more effectively.</p>
        <Link
          to="/signup"
          className="bg-white text-pink-600 px-8 py-3 rounded-full hover:bg-gray-100 transition transform hover:scale-105"
        >
          Get Started
        </Link>
      </section> 

    {/* Footer Section */}
    <footer className="bg-gray-800 text-white py-6"> {/* Further reduced padding */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3"> {/* Smaller gap */}
        <div>
          <h3 className="font-semibold text-base">PlanIt</h3> {/* Reduced text size */}
          <p className="text-sm">Your journey to productivity starts here!</p> {/* Smaller text */}
        </div>
        <div>
          <h3 className="font-semibold text-base">RESOURCES</h3> {/* Reduced text size */}
          <ul className="space-y-1"> {/* Reduced spacing between list items */}
            <li><Link to="/about" className="hover:text-pink-600 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-pink-600 transition">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-pink-600 transition">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-base">COMPANY</h3> {/* Reduced text size */}
          <ul className="space-y-1"> {/* Reduced spacing between list items */}
            <li><Link to="/careers" className="hover:text-pink-600 transition">Careers</Link></li>
            <li><Link to="/blog" className="hover:text-pink-600 transition">Blog</Link></li>
            <li><Link to="/privacy" className="hover:text-pink-600 transition">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-base">FOLLOW US</h3> {/* Reduced text size */}
          <div className="flex space-x-2"> {/* Reduced space between icons */}
            <a href="https://facebook.com" className="hover:text-pink-600 transition"><i className="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com" className="hover:text-pink-600 transition"><i className="fab fa-twitter"></i></a>
            <a href="https://linkedin.com" className="hover:text-pink-600 transition"><i className="fab fa-linkedin"></i></a>
          </div>
          <div className="mt-2"> {/* Reduced margin-top for the app badge */}
            <a href="https://play.google.com/store" className="hover:opacity-80 transition">
              <img src="/path/to/google-play-badge.png" alt="Google Play Badge" className="w-24" /> {/* Further reduced width */}
            </a>
          </div>
        </div>
      </div>
      <p className="text-center mt-3 text-sm">&copy; 2024 PlanIt. All rights reserved.</p> {/* Reduced margin and text size */}
     </footer>
    </div>
  );
};

export default HomePage;
