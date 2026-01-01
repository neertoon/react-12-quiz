import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";

export default function Question({ questionText, answers, onSelectAnswer, selectedAnswer, answerState, onSkipAnswer }) {
    return (
        <div id="question">
            <QuestionTimer  timeout={15000} onTimeout={onSkipAnswer}></QuestionTimer>
            <h2>{questionText} </h2>
            <Answers
                     answers={answers}
                     selectedAnswer={selectedAnswer}
                     onSelectAnswer={onSelectAnswer}
                     answerState={answerState}>
            </Answers>
        </div>
    );
}