import { useState, useEffect, useCallback } from 'react'

type UseCountdownReturn = {
    timeLeft: number;
    startCountdown: () => void;
}

const useCountdown = (initialTime: number, callback: () => void): UseCountdownReturn => {
    const [timeLeft, setTimeLeft] = useState<number>(initialTime);
    const [isActive, setIsActive] = useState<boolean>(false);

    const startCountdown = useCallback(() => {
        setIsActive(true);
    }, []);

    useEffect(() => {
        if (!isActive) return;

        if (timeLeft <= 0) {
            callback();
            setIsActive(false);
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, callback, isActive]);

    return { timeLeft, startCountdown };
}

export default useCountdown;
