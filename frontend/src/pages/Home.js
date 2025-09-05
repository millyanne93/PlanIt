import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, ArrowRight, Play } from 'lucide-react';
import Features from './Features';
import Pricing from './Pricing';
import AboutUs from './AboutUs';
import FAQ from './FAQ';

const HomePage = () => {
  const stats = [
    { number: '50K+', label: 'Active Users', icon: '👥' },
    { number: '1M+', label: 'Tasks Completed', icon: '✅' },
    { number: '99.9%', label: 'Uptime', icon: '⚡' },
    { number: '4.9★', label: 'User Rating', icon: '⭐' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Sparkles className="w-3 h-3 text-purple-300 opacity-40" />
          </div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-7xl md:text-8xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">Plan It.</span>
                <br />
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Do It.</span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">Achieve It!</span>
              </h1>
              <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform your productivity with the most intuitive task management platform. Beautiful, fast, and designed for the way you work.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <Link
                to="/signup"
                className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center space-x-3"
              >
                <Zap className="w-6 h-6" />
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/demo"
                className="group bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
              >
                <Play className="w-6 h-6" />
                <span>Watch Demo</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-purple-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Component */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-pink-100 -z-10"></div>
          <Features />
        </section>

        {/* About Component */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-pink-100 -z-10"></div>
          <AboutUs />
        </section>

        {/* Pricing Component */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-pink-100 -z-10"></div>
          <Pricing />
        </section>

        {/* FAQ Component */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-pink-100 -z-10"></div>
          <FAQ />
        </section>

        {/* Call to Action */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900 -z-10"></div>
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Productivity?</span>
            </h2>
            <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already revolutionized the way they work. Start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/signup"
                className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center space-x-3"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/contact"
                className="text-purple-300 hover:text-white transition-colors duration-300 font-medium"
              >
                Questions? Contact Sales →
              </Link>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-gray-800 text-white py-12 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                PlanIt
              </h3>
              <p className="text-purple-200 text-sm">Your journey to productivity starts here!</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><Link to="/about" className="hover:text-white transition-colors duration-300">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors duration-300">Contact</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors duration-300">FAQ</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors duration-300">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><Link to="/careers" className="hover:text-white transition-colors duration-300">Careers</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link></li>
                <li><Link to="/security" className="hover:text-white transition-colors duration-300">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex space-x-3 mb-4">
                {['f', 'in', 'tw'].map((social, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <span className="text-white font-bold">{social}</span>
                  </button>
                ))}
              </div>
              <p className="text-purple-200 text-sm">hello@planit.com</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-purple-300 text-sm">
              © 2025 PlanIt. All rights reserved. Made with ❤️ for productivity enthusiasts.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
