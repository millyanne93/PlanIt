import React from 'react';
import { Sparkles } from 'lucide-react';

function FAQ() {
  const faqs = [
    {
      question: 'How does PlanIt work?',
      answer: 'PlanIt helps you organize tasks, projects, and goals with an intuitive interface and powerful features.'
    },
    {
      question: 'Is there a free version?',
      answer: 'Yes! Our Starter plan is completely free and perfect for individuals.'
    },
    {
      question: 'Can I collaborate with my team?',
      answer: 'Absolutely. PlanIt Pro and Enterprise plans include collaboration tools for teams of any size.'
    },
    {
      question: 'Do you offer customer support?',
      answer: 'Yes. Pro users get priority support, and Enterprise users receive dedicated account assistance.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700"></div>
      </div>

      {/* Floating sparkles */}
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
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-purple-200">
            Everything you need to know about PlanIt
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="group bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
              <p className="text-purple-200">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
