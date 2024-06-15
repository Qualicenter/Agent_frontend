/**
 * @author Eduardo Francisco Lugo Quintana
 * @author Gustavo Tellez Mireles
 * Main page of the agent application
*/

import styled from "styled-components";
import InfoCliente from "./components/InfoCliente";
import Vehiculos from "./components/Vehiculos";
import ClientScript from "./components/ClientScript";
import VentanaAyuda from "./components/VentanaAyuda";
import ConnectStreamsComponent from "./components/ConnectStreamsComponent";
import InfoContactAgent from "./components/InfoContactAgent";
import { useState } from "react";
import ListaTranscripcion from "./components/ListaTranscripcion";
import NotificationCenter from "./components/NotificationCenter";
import QueueUpdater from "./components/QueueUpdater";
import CallLogHandler from "./components/CallLogHandler";

/* Style characteristics for the main page layout */
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
  // State variables for the main page layout
  const [clientContactId, setClientContactId] = useState(null);
  const [clientPhoneNumber, setClientPhoneNumber] = useState(null);
  const [showVentanaAyuda, setShowVentanaAyuda] = useState(false);
  const [clientVehicles, setClientVehicles] = useState(null);
  const [clientQueueDateTime, setClientQueueDateTime] = useState(null);
  const [clientContactInformation, setClientContactInformation] = useState(null);
  const [agentContactInformation, setAgentContactInformation] = useState(null);
  const [sesssionAgentInfo, setSessionAgentInfo] = useState(null);
  const [selectedPoliza, setSelectedPoliza] = useState(null); 

  // Function to show the help window
  const showVentanaHandler = () => {
    setShowVentanaAyuda(!showVentanaAyuda);
  };

  // Function to handle the selected poliza
  const handlePolizaSelect = (poliza) => {
    setSelectedPoliza(poliza); 
  };


  // Return of the main page layout
  return (
    <Wrapper>
      {showVentanaAyuda && (
        <VentanaAyuda // Subcomponent that sends messages to the supervisor
          cancelar={showVentanaHandler}
          agentInfo={sesssionAgentInfo}
          clientInfo={clientContactInformation}
        />
      )}
      <Left>
        <ListaTranscripcion 
          contactId={clientContactId}
        />
        <ConnectStreamsComponent
          setClientPhoneNumber={setClientPhoneNumber} 
          setClientContactId={setClientContactId}
          setClientQueueDateTime={setClientQueueDateTime}
          setSessionAgentInfo={setSessionAgentInfo}
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
          <QueueUpdater // Subcomponent that updates the queue status in the DynamoDB
            customerContactId={clientContactId}
          />
          <InfoContactAgent  // Subcomponent that fetches the agent contact information from the API (Agent info)
            clientContactId={clientContactId} 
            setAgentContactInformation={setAgentContactInformation} 
          />
          <Vehiculos
            clientContactId={clientContactId}
            clientContactInformation={clientContactInformation}
            onPolizaSelect={handlePolizaSelect}
          />
        </div>
        <div className="abajo">
          <ClientScript
            nombre={clientContactInformation ? clientContactInformation.FirstName + " " + clientContactInformation.LastName : "[Client Name]"}
            funcVentanaAyuda={showVentanaHandler}
            clientPhoneNumber={clientPhoneNumber}
            poliza={selectedPoliza} 
          />
        </div>
      </Right>
      <NotificationCenter Agent={sesssionAgentInfo}/>
      <CallLogHandler // Subcomponent that sends the call log information (client and agent info, call duration, etc.) to the backend
        clientContactId={clientContactId} // Contact ID from Connect Streams API in ConnectStreamsComponent.js
        clientPhoneNumber={clientPhoneNumber} // Phone number from Connect Streams API in vConnectStreamsComponent.js
        clientQueueDateTime={clientQueueDateTime} // Queue start date time from Connect Streams API Attribute MAP in ConnectStreamsComponent.js
        clientContactInformation={clientContactInformation} // Client info from SearchProfilesCommand in InfoCliente.js
        agentContactInformation={agentContactInformation} // Agent info and queue time from DescribeContactCommand in InfoContactAgent.js
      />
    </Wrapper>
  );
};
