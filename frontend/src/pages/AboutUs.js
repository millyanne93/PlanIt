import React from 'react';
import { Heart, Sparkles, Zap } from 'lucide-react';

function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
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

      <div className="relative z-10 py-20 px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl mb-8 shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              About PlanIt
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-purple-200 mb-8 leading-relaxed">
            A personal productivity app designed to help individuals organize their tasks and achieve their goals.
            This is a portfolio project showcasing my development skills.
          </p>
        </div>

        {/* Developer Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">The Developer</h2>
            <p className="text-xl text-purple-200">The mind behind this project</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center max-w-md mx-auto">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
              👩‍💻
            </div>
            <h3 className="text-white font-bold text-2xl mb-2">Millyanne Wanjala</h3>
            <p className="text-purple-400 font-medium text-lg mb-4">Software Developer</p>
            <p className="text-purple-200 leading-relaxed">
              I built PlanIt as a portfolio project to showcase my full-stack development skills.
              This application demonstrates my ability to create clean, functional, and user-friendly interfaces.
            </p>
          </div>
        </div>

        {/* Project Story */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">Project Story</h2>
              <p className="text-xl text-purple-200">The journey of building PlanIt</p>
            </div>

            <div className="space-y-8 text-purple-100 leading-relaxed">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">The Inspiration</h3>
                  <p>PlanIt was born from my passion for productivity tools and my desire to create something that combines simplicity with powerful features. As a developer, I wanted to build an app that I would personally enjoy using every day.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">The Development</h3>
                  <p>Built with modern technologies including React, Flask, and MongoDB, PlanIt represents my journey in mastering full-stack development. Every component was carefully crafted to ensure a seamless user experience.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">Future Vision</h3>
                  <p>While currently a portfolio project, PlanIt has the potential to grow into a fully-fledged productivity platform. I'm excited to continue refining and expanding its features as I develop my skills further.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 md:p-8">
                <h3 className="text-white font-bold text-xl mb-4">Want to See More?</h3>
                <p className="text-purple-100 mb-6">Check out my other projects or get in touch to discuss development opportunities.</p>
                <button className="bg-white text-purple-600 px-6 py-2 md:px-8 md:py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
