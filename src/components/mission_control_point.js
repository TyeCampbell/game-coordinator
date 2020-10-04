import React, {useEffect, useState} from 'react';

// Show double digits
// const myNumber = 7;
// const formattedNumber = ("0" + myNumber).slice(-2);


//working timer
const ControlPointMission = () => {

    const calculateTimeLeft = () => {

        let year = 2021;
        const difference = +new Date(`10/1/${year}`) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);

    });
    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {

        timerComponents.push(
            <span>
                    {timeLeft[interval]}{':'}
                </span>
        );
    });

    return (
        <div>
            <p>Time Remaining:</p>
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </div>
    );
}

export default ControlPointMission;