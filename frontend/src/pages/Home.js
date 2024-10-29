import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import 'swiper/css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  return (
    <div>
      {/* Sticky Navbar */}
      <nav className="fixed top-0 w-full bg-gradient-to-r from-pink-400 to-purple-200 shadow-lg z-50">
        <div className="container mx-auto flex justify-between items-center py-4">
          <Link to="/" className="text-pink-900 text-2xl font-semi-bold">PlanIt</Link>
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
        className="relative h-screen text-center flex flex-col justify-center items-center bg-gradient-to-r from-pink-600 to-purple-600"
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

      {/* Features Section */}
      <section className="features mb-16">
        <h2 className="text-pink-600 text-4xl font-bold text-center mb-8">Key Features</h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {[
            { icon: 'fas fa-tasks', title: 'Task Management', description: 'Manage tasks with ease and efficiency.' },
            { icon: 'fas fa-bell', title: 'Reminders', description: 'Stay on track with deadline reminders.' },
            { icon: 'fas fa-chart-line', title: 'Performance Tracking', description: 'Track your progress over time.' },
          ].map((feature, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gradient-to-r from-pink-300 to-pink-100 shadow-xl rounded-lg p-6 text-center hover:shadow-2xl transition transform hover:scale-105 h-64 flex flex-col justify-between">
                <div className="bg-pink-600 rounded-full p-4 inline-block mb-4">
                  <i className={`${feature.icon} text-black text-3xl`}></i>
                </div>
                <h3 className="text-black font-semibold mb-3 text-xl">{feature.title}</h3>
                <p className="text-black">{feature.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section> 

      {/* Testimonials Section */}
      <section className="testimonials bg-gradient-to-r from-pink-200 to-pink-100 py-16">
        <h2 className="text-pink-600 text-4xl font-bold text-center mb-8">What Our Users Say</h2>
        <Swiper slidesPerView={1} spaceBetween={10} pagination={{ clickable: true }}>
          {[
            { name: 'John Doe', review: 'This app transformed how I manage tasks!', image: '/path/to/john.jpg', rating: 5 },
            { name: 'Jane Smith', review: 'Task management has never been easier!', image: '/path/to/jane.jpg', rating: 4 },
          ].map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                <FontAwesomeIcon icon={faUser} className="text-gray-500 text-3xl" />
                <div>
                  <h3 className="text-pink-600 font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-700">{testimonial.review}</p>
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
      <section className="cta py-16 bg-pink-600 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Join Thousands of Users Improving Their Productivity!</h2>
        <p className="mb-6">Sign up today and start organizing your tasks more effectively.</p>
        <Link to="/signup" className="bg-white text-pink-600 px-8 py-3 rounded-full hover:bg-gray-100 transition transform hover:scale-105">
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
          <h3 className="font-semibold text-base">Resources</h3> {/* Reduced text size */}
          <ul className="space-y-1"> {/* Reduced spacing between list items */}
            <li><Link to="/about" className="hover:text-pink-600 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-pink-600 transition">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-pink-600 transition">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-base">Company</h3> {/* Reduced text size */}
          <ul className="space-y-1"> {/* Reduced spacing between list items */}
            <li><Link to="/careers" className="hover:text-pink-600 transition">Careers</Link></li>
            <li><Link to="/blog" className="hover:text-pink-600 transition">Blog</Link></li>
            <li><Link to="/privacy" className="hover:text-pink-600 transition">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-base">Follow Us</h3> {/* Reduced text size */}
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
