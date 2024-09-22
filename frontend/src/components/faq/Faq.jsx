import React, { useEffect, useState, useContext } from 'react';
import './FAQ.css'; // Importation du fichier CSS personnalisé
import axios from 'axios';
import { Context } from '../../main';

const FAQItem = ({ question, answer, index, activeIndex, setActiveIndex }) => {
  const isActive = index === activeIndex;

  const handleToggle = () => {
    setActiveIndex(isActive ? null : index);
  };

  return (
    <div className="faq-item mb-3">
      <div className="faq-question" onClick={handleToggle} style={{ cursor: 'pointer' }}>
        <h5 className="mb-0">{question}</h5>
      </div>
      <div className={`faq-answer collapse ${isActive ? 'show' : ''}`}>
        <p className='text-black text-b'>{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [questions, setQuestions] = useState([])

  const {baseUrl} = useContext(Context)

  useEffect(() => {
    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/v1/question/getall`)
            setQuestions(response.data.questions)
        } catch (error) {
            console.error(error)
        }
    }
    fetchQuestions()
  }, [])

  return (
    <section className='questionFaq'>
        <div className="faq-container container my-5">
      <h2 className="faq-title mb-4">Questions Fréquentes</h2>
      {questions.map((item, index) => (
        <FAQItem
          key={index}
          index={index}
          question={item.question}
          answer={item.answer}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      ))}
    </div>
    </section>
  );
};

export default FAQ;
