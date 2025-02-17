import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


export default function Stopwatch() {
    const [isRunning, setisRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);

    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() =>{
                setElapsedTime(Date.now() - startTimeRef.current())
            }, 10)
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning])

    function start() {
        setisRunning(true);
        startTimeRef.currentTime = Date.now() - elapsedTime;
    }

    function stop() {
        setisRunning(false);
    }

    function reset() {
        setElapsedTime(0);
        setisRunning(false);
    }

    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60))
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60)
        let seconds = Math.floor(elapsedTime / (1000) % 60)

        return (
            `${hours}: ${minutes}: ${seconds}`
        )
    }

    return (
        <div className='stopwatch'>
            <div className='display'>{formatTime()}</div>
            <div className='controls'>
                <button onClick={start} className='start-button'>Start</button>
                <button onClick={stop} className='stop-button'>Stop</button>
                <button onClick={reset} className='reset-button'>Reset</button>
            </div>
        </div>
    )
}
