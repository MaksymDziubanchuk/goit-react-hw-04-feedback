import { useState, useEffect } from 'react';

import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [positivePercentage, setPositivePercentage] = useState(0);
  const [leavedFeedback, setLeavedFeedback] = useState(false);

const options = ['Good', 'Neutral', 'Bad'];

  const countTotalFeedback = () => {
    setTotal(prevState => prevState + 1);
  };

  const onLeaveFeedback = evt => {
    const option = evt.target.textContent.toLowerCase();
    switch (option) {
      case 'good':
        setGood(prev => prev + 1);
        countTotalFeedback();
        setLeavedFeedback(prevState => (prevState ? prevState : !prevState));
        return;
      case 'neutral':
        setNeutral(prev => prev + 1);
        countTotalFeedback();
        setLeavedFeedback(prevState => (prevState ? prevState : !prevState));
        return;
      case 'bad':
        setBad(prev => prev + 1);
        countTotalFeedback();
        setLeavedFeedback(prevState => (prevState ? prevState : !prevState));
        return;
      default:
        console.log('Invalid option!');
    }
  };

  useEffect(() => {
    const percentage = (good / total) * 100;
    const positivePercentage = Math.round(percentage);
    setPositivePercentage(positivePercentage);
  }, [good, total]);


  return (
    <Section title="Please leave feedback">
      <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      {leavedFeedback ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          positivePercentage={positivePercentage}
        />
      ) : (
        <Notification message="There is no feedback" />
      )}
    </Section>
  );
};
