import styled from "styled-components";
import InfoCliente from "./components/InfoCliente";
import Vehiculos from "./components/Vehiculos";
import ClientScript from "./components/ClientScript";
import VentanaAyuda from "./components/VentanaAyuda";
import ConnectStreamsComponent from "./components/ConnectStreamsComponent";
import { useState } from "react";
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
  
  // Store the call log information to send to backend, update when call starts and ends
  const [callLogInformation, setCallLogInformation] = useState(null); 
  useEffect(() => {
    //If call started, send the call log information to the backend
    if (clientContactId && clientPhoneNumber && clientQueueDateTime && clientContactInformation && agentContactInformation) { // Ensure all the information is set
      setCallLogInformation({
        clientContactId, // Contact ID from Connect Streams API in ConnectStreamsComponent.js
        clientPhoneNumber, // Phone number from Connect Streams API in vConnectStreamsComponent.js
        clientContactInformation, // Client info from SearchProfilesCommand in InfoCliente.js
        agentContactInformation, // Agent info and queue time from DescribeContactCommand in InfoContactAgent.js
        clientQueueDateTime, // Queue start date time from Connect Streams API Attribute MAP in ConnectStreamsComponent.js
        finalDuration: null,
        ended: false // Call ended flag to update the call log information
      }).then(() => {
        //Send the call log information to the backend (Dynamo DB)
        insertNewCallLog(callLogInformation);
      });
    }
    //If call ended, update the call log information ended attribute
    if(clientContactId === null && callLogInformation) {
      //Update the call log information to the backend (Dynamo DB)
      id = callLogInformation.clientContactId;
      ended = true;
      finalDuration = new Date() - callLogInformation.clientQueueDateTime; //Correct this 
      updateCallLog(id, ended, finalDuration).then(() => {
        //Reset the call log information after updating
        setCallLogInformation(null);
      });
    }
  }, [clientContactId, clientPhoneNumber, clientQueueDateTime, clientContactInformation, agentContactInformation]);

  const insertNewCallLog = (callLogInformation) => {
    console.log("Contact Event - ATTEMPTING DATABASE NEW REGISTRY OF: ", callLogInformation);
  }

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
      <InfoContactAgent  // Subcomponent that fetches the agent contact information from the API (Agent info)
        contactId={clientContactId} 
        setAgentContactInformation={setAgentContactInformation} 
      />
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
