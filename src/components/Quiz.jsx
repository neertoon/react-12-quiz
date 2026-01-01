import { useState, useCallback } from 'react';
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import quizComplete from '../assets/quiz-complete.png';
export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((previewAnswers) => { return [...previewAnswers, selectedAnswer] } );
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
        return <div id="summary">
            <img src={quizComplete} alt="Trophy"></img>
            <h2>Quiz Complete!</h2>
        </div>
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
    <div id="quiz">
        <div id="question">
            <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer}></QuestionTimer>
            <h2>{QUESTIONS[activeQuestionIndex].text} </h2>
            <ul id="answers">
                {shuffledAnswers.map(
                    (answer) => <li key={answer} className="answer">
                    <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                    </li>
                )}
            </ul>
        </div>
    </div>
    );
}