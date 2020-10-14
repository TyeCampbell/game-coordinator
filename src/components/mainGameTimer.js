import React, {useEffect, useRef, useState} from "react";

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
    const [timeElapsed, setTimeElapsed] = useState(0);

    useInterval(
        () => {
            setTimeElapsed(timeElapsed => timeElapsed - 1);
        },
        status === "running" ? 1000 : null
    );

    const toggle = () => {
        setTimeElapsed(100);
        setStatus(status => (status === "running" ? "idle" : "running"));
    };

    return (
        <div>
            Time Remaining: {timeElapsed}
            <br />
            <button onClick={toggle}>
                {status === "running" ? "Stop" : "Start"}
            </button>
        </div>
    );
};

export default MainGameTimer;
