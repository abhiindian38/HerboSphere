import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './DoshaQuiz.css';
import React, { useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

import video1 from '../../assets/videos/v6.mp4';

import audioFile from '../../assets/audio/a1.mp3';


const OrderHerbs = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const questions = [
    {
      question: "What kind of climate do you prefer?",
      options: [
        { text: "Warm and sunny", dosha: "Pitta" },
        { text: "Cool and breezy", dosha: "Vata" },
        { text: "Moderate, neither hot nor cold", dosha: "Kapha" }
      ]
    },
    {
      question: "What best describes your body type?",
      options: [
        { text: "Thin and light", dosha: "Vata" },
        { text: "Athletic and muscular", dosha: "Pitta" },
        { text: "Stocky and strong", dosha: "Kapha" }
      ]
    },
    {
      question: "How do you handle stress?",
      options: [
        { text: "I feel anxious and overwhelmed", dosha: "Vata" },
        { text: "I become irritable or angry", dosha: "Pitta" },
        { text: "I withdraw and become lethargic", dosha: "Kapha" }
      ]
    },
    {
      question: "What is your skin like?",
      options: [
        { text: "Dry or rough", dosha: "Vata" },
        { text: "Sensitive or prone to acne", dosha: "Pitta" },
        { text: "Oily or smooth", dosha: "Kapha" }
      ]
    },
    {
      question: "How is your digestion?",
      options: [
        { text: "Irregular, with bloating or gas", dosha: "Vata" },
        { text: "Strong but prone to heartburn", dosha: "Pitta" },
        { text: "Slow and steady", dosha: "Kapha" }
      ]
    },
    {
      question: "What is your energy level like throughout the day?",
      options: [
        { text: "Variable, sometimes high, sometimes low", dosha: "Vata" },
        { text: "High energy, but I may burn out", dosha: "Pitta" },
        { text: "Steady and consistent", dosha: "Kapha" }
      ]
    },
    {
      question: "How are your sleeping habits?",
      options: [
        { text: "I struggle to fall or stay asleep", dosha: "Vata" },
        { text: "I sleep soundly, but not for too long", dosha: "Pitta" },
        { text: "I sleep heavily and for long hours", dosha: "Kapha" }
      ]
    },
    {
      question: "How would you describe your emotional temperament?",
      options: [
        { text: "Anxious or uncertain", dosha: "Vata" },
        { text: "Passionate and intense", dosha: "Pitta" },
        { text: "Calm and laid-back", dosha: "Kapha" }
      ]
    },
    {
      question: "What best describes your hair?",
      options: [
        { text: "Thin, dry, or frizzy", dosha: "Vata" },
        { text: "Straight, fine, or prone to graying", dosha: "Pitta" },
        { text: "Thick and oily", dosha: "Kapha" }
      ]
    },
    {
      question: "How would you describe your appetite?",
      options: [
        { text: "Irregular, I forget to eat sometimes", dosha: "Vata" },
        { text: "Strong, I feel hungry often", dosha: "Pitta" },
        { text: "Steady but I prefer fewer meals", dosha: "Kapha" }
      ]
    },
    {
      question: "What is your reaction to change?",
      options: [
        { text: "I feel unsettled or nervous", dosha: "Vata" },
        { text: "I feel frustrated or annoyed", dosha: "Pitta" },
        { text: "I am slow to react but adapt over time", dosha: "Kapha" }
      ]
    },
    {
      question: "How do you handle physical exercise?",
      options: [
        { text: "I get tired easily but enjoy variety", dosha: "Vata" },
        { text: "I enjoy intense exercise and feel energized", dosha: "Pitta" },
        { text: "I prefer slow, steady exercise like walking", dosha: "Kapha" }
      ]
    },
    {
      question: "How is your circulation?",
      options: [
        { text: "Poor, my hands and feet get cold", dosha: "Vata" },
        { text: "Good, but I may feel overheated", dosha: "Pitta" },
        { text: "Steady but I feel heavy", dosha: "Kapha" }
      ]
    },
    {
      question: "What best describes your memory?",
      options: [
        { text: "Quick to learn, but forgetful", dosha: "Vata" },
        { text: "Sharp and focused", dosha: "Pitta" },
        { text: "Slow to learn, but long-lasting", dosha: "Kapha" }
      ]
    },
    {
      question: "How do you feel after eating a meal?",
      options: [
        { text: "Light, sometimes with discomfort", dosha: "Vata" },
        { text: "Satisfied, but sometimes too hot", dosha: "Pitta" },
        { text: "Full and content", dosha: "Kapha" }
      ]
    }
  ];


  const doshaDetails = {
    Vata: {
      description: "Vata types are quick, creative, and energetic but may struggle with anxiety, dryness, and coldness.",
      imbalances: ["Anxiety", "Dry skin", "Bloating"],
      foodToAvoid: ["Cold, dry foods", "Raw vegetables", "Carbonated drinks"],
      foodToTake: ["Warm, cooked foods", "Soups", "Spices"]
    },
    Pitta: {
      description: "Pitta types are driven, passionate, and focused but may struggle with anger, inflammation, and overheating.",
      imbalances: ["Heartburn", "Irritability", "Inflammation"],
      foodToAvoid: ["Spicy foods", "Sour foods", "Alcohol"],
      foodToTake: ["Cooling foods", "Sweet fruits", "Leafy greens"]
    },
    Kapha: {
      description: "Kapha types are calm, nurturing, and steady but may struggle with lethargy, weight gain, and congestion.",
      imbalances: ["Congestion", "Weight gain", "Lethargy"],
      foodToAvoid: ["Heavy, oily foods", "Dairy products", "Sweets"],
      foodToTake: ["Light, spicy foods", "Fruits and vegetables", "Herbal teas"]
    }
  };


  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);

    if (quizIndex < questions.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      handleQuizSubmission(updatedAnswers);
    }
  };

  const [isBurstVisible, setIsBurstVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsBurstVisible(true);
    }, 500);
  }, []);

  const handleQuizSubmission = (finalAnswers) => {
    const doshaCount = { Vata: 0, Pitta: 0, Kapha: 0 };

    finalAnswers.forEach((answer) => {
      doshaCount[answer.dosha] += 1;
    });

    const maxDosha = Object.keys(doshaCount).reduce((a, b) =>
      doshaCount[a] > doshaCount[b] ? a : b
    );

    setResult({
      dosha: maxDosha,
      details: doshaDetails[maxDosha],
    });
    setQuizStarted(false);
  };

  const doshaCount = { Vata: 0, Pitta: 0, Kapha: 0 };
  answers.forEach((answer) => {
    doshaCount[answer.dosha] += 1;
  });

  const chartData = [
    { name: 'Vata', value: doshaCount.Vata },
    { name: 'Pitta', value: doshaCount.Pitta },
    { name: 'Kapha', value: doshaCount.Kapha },
  ];

  const fadeIn = useSpring({ opacity: result ? 1 : 0 });
  const slideUp = useSpring({ transform: result ? 'translateY(0)' : 'translateY(50px)' });

  const COLORS = ['#ADD8E6', '#FFA500', '#2E8B57']; 
  const [audioMuted, setAudioMuted] = useState(true); 

  useEffect(() => {
    const audio = document.getElementById('background-audio');
    
    
    const playAudio = () => {
      audio.play().catch(error => {
        console.error("Autoplay was prevented, user interaction is required:", error);
      });
    };

    playAudio(); 
  }, []);

 
  const unmuteAudio = () => {
    const audio = document.getElementById('background-audio');
    audio.muted = false;  
    setAudioMuted(false); 
    audio.play();  
  };
  return (
    <div className="ayurvedic-quiz">
     
      <video autoPlay muted loop className="background-video">
        <source src={video1} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      
       <audio id="background-audio" loop autoPlay muted>
        <source src={audioFile} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

     
      {audioMuted && (
        <button onClick={unmuteAudio} className="unmute-button">
         
        </button>
      )}
       {audioMuted && (
        <button 
          onClick={unmuteAudio} 
          style={{
            position: 'absolute',  
            top: '0',              
            left: '0',             
            width: '100%',        
            height: '100%',        
            opacity: '0',         
            zIndex: '999',         
            cursor: 'pointer',    
            border: 'none',
            background: 'none'
          }}
            
        >
          Unmute Audio
        </button>
      )}


    
      {!quizStarted && !result && (
        <button onClick={() => setQuizStarted(true)} className="start-quiz-button">
          Start Quiz
        </button>
      )}

      {quizStarted && (
        <TransitionGroup>
          <CSSTransition key={quizIndex} timeout={300} classNames="fade">
            <div className="question-container">
              <h3>{questions[quizIndex].question}</h3>
              <div className="options">
                {questions[quizIndex].options.map((option, index) => (
                  <button key={index} className="option-button" onClick={() => handleAnswer(option)}>
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      )}

      {result && (
        <animated.div style={slideUp} className="result-container">
          <div className="dosha-header">
          <h2 className={`dosha-heading ${isBurstVisible ? 'visible' : ''}`}>
        Dosha Profile
      </h2>
            <div
              className="dosha-badge"
              style={{
                backgroundColor: COLORS[Object.keys(doshaDetails).indexOf(result.dosha)],
              }}
            >
              <h3>{result.dosha}</h3>
            </div>
          </div>
          <div className="pie-chart-container">
            <PieChart width={300} height={300}>
              <Pie data={chartData} dataKey="value" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
          <animated.div style={fadeIn}>
            <div className="dos-donts">
              <div className="dos-card">
                <h4>Dos</h4>
                <ul>
                  {result.details.foodToTake.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="donts-card">
                <h4>Don'ts</h4>
                <ul>
                  {result.details.foodToAvoid.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </animated.div>
        </animated.div>
      )}
    </div>
  );
};

export default OrderHerbs;
