import React, { useState } from 'react';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

const FAQs = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const questions = [
    {
      id: 1,
      question: "Can I track the location of my booked bus online?",
      answer: "Yes, you can track your bus online by using our bus tracking app feature called “Track My Bus”. This feature allows passengers and their families to track the live bus location. You may follow your bus on a map and use the information to plan your trip to the boarding point and to get off at the correct stop. Family and friends may also check the bus position to schedule pick-ups and ensure safety."
    },
    {
      id: 2,
      question: "What are the advantages of purchasing a bus ticket with redBus?",
      answer: "There are many advantages to purchasing online bus tickets with redBus. redBus is India’s most trusted bus ticket company, where you can book any type of private or government-owned bus. redBus allows you to find the different types of buses, choose the preferred bus seats, and find your nearest boarding and dropping points. You can also filter the buses based on timings, like morning, evening, etc."
    },
    {
      id: 3,
      question: "Why book bus tickets online on redBus?",
      answer: "Booking bus tickets online on redBus is increasingly becoming the preferred choice for travellers due to its numerous advantages over traditional methods. With redBus, customers can book their bus tickets effortlessly from the comfort of their homes, avoiding the inconvenience of standing in long lines at bus stations or travel agencies. Online bus booking offers the luxury of comparing different bus schedules and operators and presents various discount offers and exclusive deals, resulting in significant savings. Payment security is another notable feature of online booking, which ensures that your financial information is well-protected against fraud. Additionally, customers can pick their seats, providing a customized travel experience. Online bus booking platforms give real-time updates about any changes in the bus timetable, including delays or cancellations, enabling better planning. The convenience doesn't stop here; travellers can even compare onboard amenities like charging points or snacks, further enhancing the travel experience."
    },
    {
      id: 4,
      question: "Does bus booking online cost me more?",
      answer: "Not at all! The bus ticket price is the same as you would get from the bus operator/ counter of any bus ticket agency. redbus reduces the travel budget by comparing the bus ticket prices among various operators, making it a more cost-effective choice. Therefore, online bus booking is increasingly recognized as a more convenient, efficient, and economical mode of securing travel arrangements."
    },
    {
      id: 5,
      question: "How can I get the discounts on the bus booking?",
      answer: "To get a discount on bus booking, please visit https://www.redbus.in/info/OfferTerms and check the available offers. Copy the coupon code and paste it during checkout to avail of the discount."
    },
    {
      id: 6,
      question: "What's New in Bus Booking on redBus?",
      answer: "Primo Bus Ticket: redBus has launched Primo bus services, where passengers can enjoy travelling in high-rated buses with best-in-class services. While looking for bus tickets on the desired route, customers can check the Primo tag to choose this excellent service. From hygiene standards to on-time service and comfort, passengers can benefit from the online bus booking experience from Primo buses."
    }
    ,
    {
      id: 7,
      question: "Can I book a Government bus ticket on redBus?",
      answer: "Yes, you can book government bus tickets on redBus. redBus has extended its bus booking services to many RTCs in India. Some of these RTCs are Andhra Pradesh State Road Transport Corporation (APSRTC), Assam State Transport Corporation (ASTC), Bihar State Tourism Development Corporation (BSTDC), Himachal Road Transport Corporation (HRTC), Jammu and Kashmir State Road Transport Corporation (JKSRTC), Kerala RTC, Kadamba Transport Corporation (KTCL), Patiala and the East Punjab States Union (PEPSU), Puducherry Road Transport Corporation (PRTC), Rajasthan State Road Transport Corporation (RSRTC), South Bengal State Transport Corporation (SBSTC), Uttarakhand Transport Corporation (UTC), West Bengal Transport Corporation WBTC (CTC), North Bengal State Transport Corporation (NBSTC) Chandigarh Transport Undertaking (CTU) "
    }
  ];

  const toggleQuestion = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className='text-left my-10 w-full mx-auto px-6'>
      <h1 className='text-4xl mb-4 ml-40'>FAQs related to Bus Tickets Booking</h1>
      <div className='bg-gray-50 mx-40 rounded-lg shadow-sm'>
        {questions.map((q) => (
          <div key={q.id} className='mb-4'>
            <button
              className='w-full text-left font-semibold p-4 bg-white rounded-lg shadow-md flex justify-between items-center'
              onClick={() => toggleQuestion(q.id)}
            >
              {q.question}
              {activeQuestion === q.id ? <FaMinusCircle /> : <FaPlusCircle />}
            </button>
            <AnimatePresence>
              {activeQuestion === q.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className='p-4 bg-gray-100 rounded-lg mt-2'
                >
                  <p className='text-gray-600'>{q.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
