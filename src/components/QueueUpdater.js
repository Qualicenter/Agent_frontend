import { useEffect } from 'react';


// Component to update the remove a call from the queue database when a call starts
const QueueUpdater = ({ customerContactId }) => {

  useEffect(() => {
    const updateQueue = async () => {
      // Send a PUT request to the server to update the queue data of the contact id
      try {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URL ? process.env.REACT_APP_FETCH_URL : 'http://localhost:8080'}/queuedata/updateQueueData`, {
          method: 'PUT',
          headers: {
             'Content-Type': 'application/json' 
          },
          body: JSON.stringify({ ContactID: customerContactId }),
        });
        
        if (response.ok) {
          console.log("Contact Event - Queue data updated successfully");
        } else {
          console.error("Failed to update queue data");
        }
      } catch (err) {
        console.error("Error updating queue data:", err);
      }
    };

    if (customerContactId !== null) {
      console.log("Contact Event - Updating queue data for contact id:", customerContactId);
      updateQueue();
    }
  }, [customerContactId]);

  // Return null to avoid rendering anything visually
  return null;
};

export default QueueUpdater;
