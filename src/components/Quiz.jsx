import { useState, useCallback } from 'react';
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import quizComplete from '../assets/quiz-complete.png';
import Answers from "./Answers.jsx";
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



    return (
    <div id="quiz">
        <div id="question">
            <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer}></QuestionTimer>
            <h2>{QUESTIONS[activeQuestionIndex].text} </h2>
            <Answers key={activeQuestionIndex}
                    answers={QUESTIONS[activeQuestionIndex].answers}
                     selectedAnswer={userAnswers[userAnswers.length - 1]}
                     onSelectAnswer={handleSelectAnswer}
                     answerState={answerState}>
            </Answers>
        </div>
    </div>
    );
}