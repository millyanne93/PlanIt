import React from 'react';
import { Sparkles, CheckCircle } from 'lucide-react';

function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for individuals trying out PlanIt',
      features: ['Basic task management', '1 project', 'Community support'],
      color: 'from-blue-500 to-purple-600'
    },
    {
      name: 'Pro',
      price: '$29/month',
      description: 'Best for professionals and small teams',
      features: ['Unlimited projects', 'Collaboration tools', 'Priority support'],
      color: 'from-pink-500 to-rose-600'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Tailored solutions for large organizations',
      features: ['Dedicated support', 'Advanced security', 'Custom integrations'],
      color: 'from-emerald-500 to-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700"></div>
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
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-white mb-6">Pricing Plans</h1>
          <p className="text-xl text-purple-200">
            Choose the perfect plan for your productivity journey
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="group bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10"
            >
              <div className="relative mb-6">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.color} rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500`}
                ></div>
                <div
                  className={`relative w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg`}
                >
                  💎
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-purple-200 mb-4">{plan.description}</p>
              <p className="text-3xl font-bold text-white mb-6">{plan.price}</p>

              <ul className="space-y-3 text-purple-200 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pricing;
