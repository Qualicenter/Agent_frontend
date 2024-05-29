import styled from "styled-components";
import InfoCliente from "./components/InfoCliente";
import Vehiculos from "./components/Vehiculos";
import ClientScript from "./components/ClientScript";
import VentanaAyuda from "./components/VentanaAyuda";
import ConnectStreamsComponent from "./components/ConnectStreamsComponent";
import InfoContactAgent from "./components/InfoContactAgent";
import { useState, useEffect } from "react";
import ListaTranscripcion from "./components/ListaTranscripcion";

const Wrapper = styled.main`
  position: relative;
  width: 1194px;
  height: 834px;
  display: flex;
  z-index: 0;
`;

const Left = styled.section`
  width: 35%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Right = styled.section`
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .arriba {
    height: 30%;
    display: flex;
    padding: 10px;
    gap: 20px;
  }

  .abajo {
    height: 70%;
    padding: 10px;
  }
`;

export const HomePage = () => {
  const [clientContactId, setClientContactId] = useState(null);
  const [clientPhoneNumber, setClientPhoneNumber] = useState(null);
  const [showVentanaAyuda, setShowVentanaAyuda] = useState(false);
  const [clientVehicles, setClientVehicles] = useState(null);
  const [clientQueueDateTime, setClientQueueDateTime] = useState(null);
  const [clientContactInformation, setClientContactInformation] = useState(null);
  const [agentContactInformation, setAgentContactInformation] = useState(null);
  
  // Store the call log information to send to backend, updates when call starts and ends
  const [callLogInformation, setCallLogInformation] = useState(null); 
  // When a call starts and all the information is set, send the call log information to the backend
  useEffect(() => {
    //If call started, send the call log information to the backend
    console.log("Contact Event - Attribute UPDATE: ", clientContactId, clientPhoneNumber, clientQueueDateTime, clientContactInformation, agentContactInformation);
    if (clientContactId !== null && 
      clientPhoneNumber !== null && 
      clientQueueDateTime !== null && 
      clientContactInformation !== null && 
      agentContactInformation !== null) { // Ensure all the information is set
        console.log("Contact Event - All attributes are set, sending to backend")
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
  }, [clientContactId, clientPhoneNumber, clientQueueDateTime, clientContactInformation, agentContactInformation]);

  // Logic to insert or update the call log information in the backend based on the call status
  useEffect(() => {
    // Update call log information when it's set initially
    if (callLogInformation !== null) {
      console.log("Contact Event - Call Log Information set to: ", callLogInformation);
      // Send the call log information to the backend (Dynamo DB)
      insertNewCallLog(callLogInformation);
    }
  
    const updateCallLogAsync = async () => {
      // Update call log information when the call ends
      if (clientContactId === null && callLogInformation !== null) {
        // Update the call log information with the final duration and the ended flag
        const id = callLogInformation.clientContactId;
        const ended = true;
        const formattedTime = callLogInformation.clientQueueDateTime.replace('T', ' ') + ' UTC';
        const finalDurationMillis = new Date() - new Date(formattedTime);
        const finalDuration = Math.floor(finalDurationMillis / 1000); // Convert milliseconds to seconds
        console.log("Contact Event - Call Ended, updating call log information with final duration and ended flag", id, ended, finalDuration);

        try {
          await updateCallLog(id, ended, finalDuration);
          // Send the call log information to the backend (Dynamo DB)
          updateCallLog(id, ended, finalDuration);
          
          // Reset the call log information after updating
          console.log("Contact Event - Registry updated, resetting call log information");
          setCallLogInformation(null);
        } catch (error) {
          console.error("Error updating call log information", error);
        }
      }
    };

    updateCallLogAsync();
  }, [callLogInformation, clientContactId]);
  
  const insertNewCallLog = (callLogInformation) => {
    console.log("Contact Event - ATTEMPTING DATABASE NEW REGISTRY OF: ", callLogInformation);
  };

  const updateCallLog = (id, ended, finalDuration) => {
    console.log("Contact Event - ATTEMPTING DATABASE UPDATING: ", id, ended, finalDuration);
  };

  // Function to show the help window
  const showVentanaHandler = () => {
    setShowVentanaAyuda(!showVentanaAyuda);
  };


  // Return of the main page layout
  return (
    <Wrapper>
      {showVentanaAyuda && <VentanaAyuda cancelar={showVentanaHandler} />}
      <Left>
        <ListaTranscripcion 
          clientContactId={clientContactId}
        />
        <ConnectStreamsComponent
          setClientPhoneNumber={setClientPhoneNumber} 
          setClientContactId={setClientContactId}
          setClientQueueDateTime={setClientQueueDateTime}
        />
      </Left>
      <Right>
        <div className="arriba">
          <InfoCliente
            clientContactInformation = {clientContactInformation} // Contact Information fetched from API
            setClientContactInformation = {setClientContactInformation}
            clientPhoneNumber = {clientPhoneNumber}
            clientContactId = {clientContactId}
            clientQueueDateTime = {clientQueueDateTime} // Queue start date time
            setClientVehicles={setClientVehicles}
          />
          <InfoContactAgent  // Subcomponent that fetches the agent contact information from the API (Agent info)
            clientContactId={clientContactId} 
            setAgentContactInformation={setAgentContactInformation} 
          />
          <Vehiculos
            clientVehicles={clientVehicles}
          />
        </div>
        <div className="abajo">
          <ClientScript
            nombre="Juan Perez"
            funcVentanaAyuda={showVentanaHandler}
            clientPhoneNumber={clientPhoneNumber}
          />
        </div>
      </Right>
    </Wrapper>
  );
};
