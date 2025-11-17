import { useState, useEffect } from 'react';
export default function QuestionTimer({ timeout, onTimeout }) {
    const [timeLeft, setTimeLeft] = useState(timeout);

    useEffect(() => {
        setTimeout(onTimeout, timeout);
    }, [onTimeout, timeout]);

    useEffect(() => {
        setInterval(() => setTimeLeft((prevLeftTime) => prevLeftTime - 100), 100);
    }, []);


    return <progress id="question-time" max={timeout} value={timeLeft} />
}