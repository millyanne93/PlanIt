import React from 'react';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: ['Basic Task Management', 'Single-User Only', 'Basic Support'],
    },
    {
      name: 'Pro',
      price: '$15',
      features: ['Advanced Task Management', 'Reminders', 'Performance Tracking', 'Email Support'],
    },
    {
      name: 'Enterprise',
      price: 'Contact Us',
      features: ['Team Collaboration', 'Priority Support', 'Custom Solutions', 'Dedicated Account Manager'],
    },
  ];

  return (
    <div className="py-20 px-4">
      <h1 className="text-5xl font-bold text-pink-600 text-center mb-10">Choose a Plan that Works for You</h1>
      <p className="text-lg text-center mb-16">Select from our range of plans to find the perfect fit for your needs.</p>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div key={index} className="bg-gradient-to-r from-pink-300 to-pink-100 p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition">
            <h3 className="text-3xl font-bold text-pink-600 mb-4">{plan.name}</h3>
            <p className="text-4xl font-semibold mb-6">{plan.price}</p>
            <ul className="text-black mb-6 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="text-lg">{feature}</li>
              ))}
            </ul>
            <button className="bg-pink-600 text-white py-3 px-6 rounded-full hover:bg-pink-700 transition transform hover:scale-105">Get Started</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
