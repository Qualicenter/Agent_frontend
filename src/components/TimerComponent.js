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

    p {
        font-size: 16px;
        margin-top: 5px;
        color: ${props => props.color};
    }
`

const TimerComponent = (props) => {
    const { queueStartTime, contactId } = props;
    const [elapsedTime, setElapsedTime] = useState('');
    const [color, setColor] = useState('green');

    useEffect(() => {
        if (queueStartTime && contactId) {
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

                // Determine the color based on the elapsed time
                const totalMinutes = hours * 60 + minutes + seconds / 60;
                
                if (totalMinutes <= 2.5) {
                    setColor('green');
                } else if (totalMinutes <= 3) {
                    setColor('orange');
                } else {
                    setColor('red');
                }
            };
    
            const timerInterval = setInterval(calculateElapsedTime, 1000);
    
            return () => clearInterval(timerInterval);
        } else {
            setElapsedTime(''); // Reset elapsedTime if queueStartTime is null
        }
    }, [queueStartTime, contactId]);
    

    return (
        <Div color={color}>
            <h2>Total Call Duration</h2>
            {queueStartTime && <p>{elapsedTime}</p>}
        </Div>
    )
}

export default TimerComponent;
