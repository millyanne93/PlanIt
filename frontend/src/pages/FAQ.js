import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  { question: "What is PlanIt?", answer: "PlanIt is a productivity tool designed to help you manage tasks and boost collaboration." },
  { question: "Is there a free version?", answer: "Yes, we offer a free plan with basic features suitable for individual use." },
  { question: "Can I upgrade my plan?", answer: "Absolutely! You can upgrade to a Pro or Enterprise plan anytime for more features." },
  { question: "Is my data secure?", answer: "Yes, data security is a priority for us. We implement industry-standard encryption to protect your information." },
];

function FAQ() {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestionIndex(index === openQuestionIndex ? null : index);
  };

  return (
    <div className="bg-gradient-to-r from-pink-200 to-pink-100 text-black py-10 px-5">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-pink-300 to-pink-100">
              <div
                onClick={() => toggleQuestion(index)}
                className="flex justify-between items-center cursor-pointer text-pink-600"
              >
                <h2 className="text-lg font-semibold">{faq.question}</h2>
                {openQuestionIndex === index ? (
                  <FaChevronUp className="text-xl" />
                ) : (
                  <FaChevronDown className="text-xl" />
                )}
              </div>
              {openQuestionIndex === index && (
                <p className="mt-3 text-black">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
