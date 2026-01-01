import { useState, useCallback } from 'react';
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import quizComplete from '../assets/quiz-complete.png';
export default function Quiz() {
    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered')
        setUserAnswers((previewAnswers) => { return [...previewAnswers, selectedAnswer] } );
        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setAnswerState('')
            }, 1000);
        }, 1000);
    }, [activeQuestionIndex]);

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
            <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer}></QuestionTimer>
            <h2>{QUESTIONS[activeQuestionIndex].text} </h2>
            <ul id="answers">
                {shuffledAnswers.map(
                    (answer) => {
                        const isSelected = userAnswers[userAnswers.length - 1] === answer;
                        let cssClass = '';

                        if (answerState === 'answered' && isSelected) {
                            cssClass = 'selected';
                        } else if (answerState === 'correct' && isSelected) {
                            cssClass = 'correct';
                        } else if (answerState === 'wrong' && isSelected) {
                            cssClass = 'wrong';
                        }

                        return (<li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>{answer}</button>
                        </li>);
                    }
                )}
            </ul>
        </div>
    </div>
    );
}