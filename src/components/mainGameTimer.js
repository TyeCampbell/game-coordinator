import React, {useEffect, useRef, useState} from "react";
import {formattedTimer} from "../utility/helpers";

const incomingPropTime = {
    hours: 0,
    minutes: 2,
    seconds: 0
}

const useInterval = (callback, delay) => {
    const intervalId = useRef(null);
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        const tick = () => savedCallback.current();

        if (typeof delay === "number") {
            intervalId.current = setInterval(tick, delay);

            return () => clearInterval(intervalId.current);
        }
    }, [delay]);

    return intervalId.current;
};

const MainGameTimer = () => {
    const [status, setStatus] = useState("idle");
    const [timeRemaining, setTimeRemaining] = useState(incomingPropTime);

    useInterval(
        () => {
            setTimeRemaining(timeRemaining => {
                const {hours, minutes, seconds} = timeRemaining;

                if (hours > 0 && minutes === 0 && seconds === 0) {
                    return {
                        hours: hours - 1,
                        minutes: 59,
                        seconds: 59
                    }
                }

                if (minutes > 0 && seconds === 0) {
                    return {
                        hours: hours,
                        minutes: minutes -1,
                        seconds: 59
                    }
                }

                if (seconds > 0) {
                    return {
                        hours: hours,
                        minutes: minutes,
                        seconds: seconds -1
                    }
                }

                return {
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                }
            });
        },
        status === "running" ? 1000 : null
    );

    const toggle = () => {
        setTimeRemaining(incomingPropTime);
        setStatus(status => (status === "running" ? "idle" : "running"));
    };

    return (
        <div>
            <h1>{formattedTimer(timeRemaining)}</h1>
            <br />
            <button onClick={toggle}>
                {status === "running" ? "Stop" : "Start"}
            </button>
        </div>
    );
};

export default MainGameTimer;
