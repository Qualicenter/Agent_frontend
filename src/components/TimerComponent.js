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
    
                // Transform the queueStartTime string
                const formattedQueueStartTime = queueStartTime.replace('T', ' ') + ' UTC';
                console.log('TimerComponent - formattedQueueStartTime:', formattedQueueStartTime);
    
                // Create Date objects
                const localQueueStartTime = new Date(formattedQueueStartTime);
                console.log('TimerComponent - formatted to Date:', localQueueStartTime);
    
                const now = new Date();
                console.log('TimerComponent - Date now', now);
    
                // Calculate the time difference in milliseconds
                const timeDifference = now - localQueueStartTime;
                console.log('TimerComponent - timeDifference:', timeDifference);
    
                // Convert timeDifference to hours, minutes, and seconds
                const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
                console.log('TimerComponent - h/m/s:', hours, minutes, seconds);
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
