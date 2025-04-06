import { useEffect, useRef, useState } from "react";

export const useIdleLogout = ({ timeout = 5 * 60 * 1000 }) => {
    const [isIdle, setIsIdle] = useState(false);
    const timerRef = useRef(null);

    const resetTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setIsIdle(true);
        }, timeout);
    };

    useEffect(() => {
        const events = ["mousemove", "keydown", "mousedown", "touchstart", "scroll"];
        events.forEach((event) => window.addEventListener(event, resetTimer));

        resetTimer(); // start timer on mount

        return () => {
            events.forEach((event) => window.removeEventListener(event, resetTimer));
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [timeout]);

    return isIdle;
};
