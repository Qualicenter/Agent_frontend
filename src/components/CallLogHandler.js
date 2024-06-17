/**
 * @author Gustavo Tellez Mireles
 * Component containing the script for the client's call, the capture of the client's address,
 * the sending of the ambulance, crane and the adjuster
*/

import { useState, useEffect } from "react";

const CallLogHandler = ({
  clientContactId,
  clientPhoneNumber,
  clientQueueDateTime,
  clientContactInformation,
  agentContactInformation
}) => {
  const [callLogInformation, setCallLogInformation] = useState(null);

  // Store the call log information to send to backend, updates when call starts and ends
  useEffect(() => {
    // If call started, send the call log information to the backend
    if (
      clientContactId !== null &&
      clientPhoneNumber !== null &&
      clientQueueDateTime !== null &&
      clientContactInformation !== null &&
      agentContactInformation !== null
    ) {
      // Ensure all the information is set
      setCallLogInformation({
        clientContactId, // Contact ID from Connect Streams API in ConnectStreamsComponent.js
        clientPhoneNumber, // Phone number from Connect Streams API in vConnectStreamsComponent.js
        clientContactInformation, // Client info from SearchProfilesCommand in InfoCliente.js
        agentContactInformation, // Agent info and queue time from DescribeContactCommand in InfoContactAgent.js
        clientQueueDateTime, // Queue start date time from Connect Streams API Attribute MAP in ConnectStreamsComponent.js
        finalDuration: null,
        ended: false // Call ended flag to update the call log information
      });
    }
  }, [
    clientContactId,
    clientPhoneNumber,
    clientQueueDateTime,
    clientContactInformation,
    agentContactInformation
  ]);

  // Logic to insert or update the call log information in the backend based on the call status
  useEffect(() => {
    // Update call log information when it's set initially
    if (callLogInformation !== null) {
      // Send the call log information to the backend (Dynamo DB)
      insertNewCallLog(callLogInformation);
    }

    const updateCallLogAsync = async () => {
      // Update call log information when the call ends
      if (clientContactId === null && callLogInformation !== null) {
        // Update the call log information with the final duration and the ended flag
        const id = callLogInformation.clientContactId;
        const ended = true;
        const formattedTime = callLogInformation.clientQueueDateTime.replace("T", " ") + " UTC";
        const finalDurationMillis = new Date() - new Date(formattedTime);
        const finalDuration = Math.floor(finalDurationMillis / 1000); // Convert milliseconds to seconds

        try {
          await updateCallLog(id, ended, finalDuration);
          // Send the call log information to the backend (Dynamo DB)
          updateCallLog(id, ended, finalDuration);

          // Reset the call log information after updating
          setCallLogInformation(null);
        } catch (error) {
          console.error("Error updating call log information", error);
        }
      }
    };

    updateCallLogAsync();
  }, [callLogInformation, clientContactId]);

  const insertNewCallLog = async (callLogInformation) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL ? process.env.REACT_APP_FETCH_URL : 'http://localhost:8080'}/callsdata/createCallData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(callLogInformation)
        }
      );

      if (response.ok) {
        console.log("Contact Event - Call data created successfully");
      } else {
        throw new Error("Error creating call data");
      }
    } catch (error) {
      console.error("Error creating call data:", error);
    }
  };

  /* Function to update the call log information when the call ends */
  const updateCallLog = async (id, finalDuration) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL ? process.env.REACT_APP_FETCH_URL : 'http://localhost:8080'}/callsdata/updateCallData`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            clientContactId: id,
            finalDuration: finalDuration
          })
        }
      );

      if (!response.ok) {
        throw new Error("Error updating call data");
      }
    } catch (error) {
      console.error("Error updating call data:", error);
    }
  };

  return null; // This component does not render anything
};

export default CallLogHandler;
