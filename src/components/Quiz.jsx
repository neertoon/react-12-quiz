import { useState, useCallback } from 'react';
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import quizComplete from '../assets/quiz-complete.png';
import Answers from "./Answers.jsx";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";
export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((previewAnswers) => { return [...previewAnswers, selectedAnswer] } );
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
        return <Summary userAnswers={userAnswers}></Summary>;
    }

    return (
    <div id="quiz">
        <Question key={activeQuestionIndex}
                  questionIndex={activeQuestionIndex}
                  onSelectAnswer={handleSelectAnswer}
                  onSkipAnswer={handleSkipAnswer}
        />
    </div>
    );
}