import quizComplete from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Summary({ userAnswers }) {
    const skippedQuestions = userAnswers.filter(answer => answer === null).length;
    const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]).length;
    const skippedPercentage = Math.round((skippedQuestions / userAnswers.length) * 100);
    const correctPercentage = Math.round((correctAnswers / userAnswers.length) * 100);
    const wrongPercentage = 100 - skippedPercentage - correctPercentage;

    return (<div id="summary">
        <img src={quizComplete} alt="Trophy"></img>
        <h2>Quiz Complete!</h2>
        <div id="summary-stats">
            <p>
                <span className="number">{skippedPercentage}%</span>
                <span className="text">skiped</span>
            </p>

            <p>
                <span className="number">{correctPercentage}%</span>
                <span className="text">answer correctly</span>
            </p>

            <p>
                <span className="number">{wrongPercentage}%</span>
                <span className="text">answer incorrectly</span>
            </p>
        </div>
        <ol>
            {userAnswers.map((answer, index) => {
                let cssClass = 'user-answer';

                if (answer === null) {
                    cssClass += ' skipped';
                } else if (answer === QUESTIONS[index].answers[0]) {
                    cssClass += ' correct';
                } else {
                    cssClass += ' wrong';
                }

                return (
                    <li key={index}>
                        <h3>{index + 1}</h3>
                        <p className="question">
                            {QUESTIONS[index].text}
                        </p>
                        <p className={cssClass}>
                            {answer ?? 'Skipped'}
                        </p>
                    </li>
                )
            })}
        </ol>
    </div>);
}