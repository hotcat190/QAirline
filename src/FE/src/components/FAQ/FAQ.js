import React, { useState } from "react";
import "./FAQ.css";

function FAQ() {
  const [activeIndexes, setActiveIndexes] = useState([]);

  const toggleAnswer = (index) => {
    if (activeIndexes.includes(index)) {
      setActiveIndexes(activeIndexes.filter((i) => i !== index));
    } else {
      setActiveIndexes([...activeIndexes, index]);
    }
  };

  const faqs = [
    {
      question: "How can I book a flight online?",
      answer: "To book a flight online, enter your departure and arrival cities, choose your travel dates, select a flight, and proceed with the booking process by providing passenger details and payment.",
    },
    {
      question: "Can I change or cancel my flight booking?",
      answer: "Yes, you can change or cancel your booking, depending on the airline's policy. Some changes may incur fees, especially for non-refundable tickets.",
    },
    {
      question: "What documents do I need to check in?",
      answer: "You'll need a valid passport for international flights and an ID or passport for domestic flights. Check with your airline for any additional documentation requirements.",
    },
    {
      question: "How do I choose my seat on a flight?",
      answer: "During the booking process, you may have an option to select your seat. Alternatively, you can choose your seat during check-in, subject to availability.",
    },
    {
      question: "What should I do if my flight is delayed or canceled?",
      answer: "If your flight is delayed or canceled, check with your airline for rebooking options or compensation policies. Most airlines provide assistance to rebook or refund your ticket.",
    },
    {
      question: "Can I carry extra luggage?",
      answer: "Yes, but there may be fees for extra luggage. Check your airline’s baggage policy for weight limits and additional charges for excess luggage.",
    },
  ];

  return (
    <div className="faq-section">
      <div className="content">
        <h2>Get the Answers You Need</h2>
        <p className="desc">
          Got questions? We've got answers! Here are the top FAQs to help make your booking experience smooth and stress-free.
        </p>

        <div className="faq-container">
          {[0, 1].map((columnIndex) => (
            <div className={`faq-box ${columnIndex === 1 ? "not-on-mobile" : ""}`} key={columnIndex}>
              {faqs.slice(columnIndex * 3, columnIndex * 3 + 3).map((faq, index) => (
                <div className="faq-item" key={index}>
                  <div className="question-box">
                    <p className="question">{faq.question}</p>
                    <button
                      className="operator"
                      onClick={() => toggleAnswer(index + columnIndex * 3)}
                    >
                      {activeIndexes.includes(index + columnIndex * 3) ? "x" : "+"}
                    </button>
                  </div>
                  <p
                    className={`answer ${activeIndexes.includes(index + columnIndex * 3) ? "open" : ""}`}
                  >
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
