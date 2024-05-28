import { useEffect, useState } from "react";
import styled from "styled-components";

const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;

    h2 {
        font-size: 18px;
        margin-top: 10px;
    }
`

const TimerComponent = (props) => {
    const { queueStartTime } = props;
    const [elapsedTime, setElapsedTime] = useState('');

    useEffect(() => {
        if (queueStartTime) {
            const calculateElapsedTime = () => {
                console.log('Contact Event - TimerComponent input attribute:', queueStartTime);

                const utcQueueStartTime = new Date(queueStartTime);
                console.log('Contact Event - TimerComponent attribute to Date:', utcQueueStartTime);
                
                const now = new Date(Date.now());
                console.log('Contact Event - TimerComponent Date now', now);

                const timeDifference = now - utcQueueStartTime;
                console.log('Contact Event - TimerComponent timeDifference:', timeDifference);
                
                const toAdd = { hours: 6, minutes: 60, seconds: 60 }; // XD
                const hours = Math.floor((now.getTime() - utcQueueStartTime.getTime()) / (1000 * 60 * 60)) + toAdd.hours;
                const minutes = Math.floor(((now.getTime() - utcQueueStartTime.getTime()) % (1000 * 60 * 60)) / (1000 * 60)) + toAdd.minutes;
                const seconds = Math.floor(((now.getTime() - utcQueueStartTime.getTime()) % (1000 * 60)) / 1000) + toAdd.seconds;

                console.log('Contact Event - TimerComponent h/m/s:', hours, minutes, seconds);
                setElapsedTime(`${hours}h ${minutes}m ${seconds}s`);
            };

            const timerInterval = setInterval(calculateElapsedTime, 1000);

            return () => clearInterval(timerInterval);
        } else {
            setElapsedTime(''); // Reset elapsedTime if queueStartTime is null
        }
    }, [queueStartTime]);

    return (
        <Div>
            <h2>Queue Time</h2>
            {queueStartTime && <p>{elapsedTime}</p>}
        </Div>
    )
}

export default TimerComponent;
