import React, { useState } from 'react';
import { CheckCircle, Bell, BarChart3, Users, Zap, Target, Shield, Clock, Sparkles, ArrowRight, Play } from 'lucide-react';

const Features = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const mainFeatures = [
    { 
      icon: CheckCircle, 
      title: 'Smart Task Management', 
      description: 'Create, organize, and prioritize tasks with AI-powered suggestions and intelligent categorization.',
      details: ['Drag & drop interface', 'Smart categorization', 'Quick actions', 'Bulk operations'],
      color: 'from-blue-500 to-purple-600'
    },
    { 
      icon: Bell, 
      title: 'Intelligent Reminders', 
      description: 'Never miss a deadline with smart notifications that adapt to your schedule and preferences.',
      details: ['Smart scheduling', 'Multiple notification channels', 'Snooze options', 'Context-aware alerts'],
      color: 'from-orange-500 to-red-500'
    },
    { 
      icon: BarChart3, 
      title: 'Advanced Analytics', 
      description: 'Track your productivity with detailed insights, beautiful charts, and actionable recommendations.',
      details: ['Productivity trends', 'Time tracking', 'Goal progress', 'Performance insights'],
      color: 'from-green-500 to-emerald-600'
    },
    { 
      icon: Users, 
      title: 'Team Collaboration', 
      description: 'Work together seamlessly with shared projects, real-time updates, and team communication.',
      details: ['Real-time sync', 'Team workspaces', 'Permission controls', 'Activity feeds'],
      color: 'from-pink-500 to-rose-600'
    },
  ];

  const additionalFeatures = [
    { icon: Zap, title: 'Lightning Fast', description: 'Optimized for speed and performance' },
    { icon: Shield, title: 'Enterprise Security', description: 'Bank-level encryption and security' },
    { icon: Target, title: 'Goal Tracking', description: 'Set and achieve your objectives' },
    { icon: Clock, title: 'Time Management', description: 'Built-in time tracking and estimation' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
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
        <div className="max-w-6xl mx-auto text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl mb-8 shadow-lg">
            <Zap className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Powerful Features
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Built for You
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-200 mb-12 max-w-4xl mx-auto leading-relaxed">
            Discover the tools that will transform how you work, collaborate, and achieve your goals. 
            Every feature is designed with your productivity in mind.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center space-x-3">
              <span>Try All Features</span>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button className="group bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-3">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-purple-200 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* Feature details that appear on hover */}
                    <div className={`overflow-hidden transition-all duration-500 ${
                      hoveredFeature === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <ul className="space-y-2 mt-4">
                        {feature.details.map((detail, i) => (
                          <li key={i} className="flex items-center text-purple-300 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Hover indicator */}
                <div className={`mt-6 flex items-center text-purple-400 font-medium transition-all duration-300 ${
                  hoveredFeature === index ? 'opacity-100 transform translate-x-2' : 'opacity-0'
                }`}>
                  <span className="text-sm">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Features */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">And Much More...</h2>
            <p className="text-xl text-purple-200">Additional features that make PlanIt the complete productivity solution</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="group bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                <p className="text-purple-200 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">See How PlanIt Compares</h2>
              <p className="text-purple-200">Why thousands choose PlanIt over the competition</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🥉</div>
                <h3 className="text-white font-bold mb-2">Other Tools</h3>
                <ul className="space-y-2 text-purple-300 text-sm">
                  <li>Basic task lists</li>
                  <li>Limited customization</li>
                  <li>Slow performance</li>
                  <li>Poor mobile experience</li>
                </ul>
              </div>

              <div className="text-center border-2 border-purple-400 rounded-xl p-6 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                  RECOMMENDED
                </div>
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-white font-bold mb-2">PlanIt</h3>
                <ul className="space-y-2 text-green-300 text-sm">
                  <li>✓ AI-powered organization</li>
                  <li>✓ Beautiful, intuitive design</li>
                  <li>✓ Lightning-fast performance</li>
                  <li>✓ Perfect mobile experience</li>
                  <li>✓ Advanced analytics</li>
                  <li>✓ Team collaboration</li>
                </ul>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">🥈</div>
                <h3 className="text-white font-bold mb-2">Premium Tools</h3>
                <ul className="space-y-2 text-purple-300 text-sm">
                  <li>Good features but expensive</li>
                  <li>Complex setup required</li>
                  <li>Limited free tier</li>
                  <li>Steep learning curve</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Demo Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Experience PlanIt in Action</h2>
            <p className="text-purple-200 mb-8">See how easy it is to manage your tasks with our interactive demo</p>
            
            <div className="relative inline-block">
              <button className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center space-x-4">
                <Play className="w-8 h-8" />
                <span>Try Interactive Demo</span>
                <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              {/* Floating badge */}
              <div className="absolute -top-2 -right-2 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                NEW!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
