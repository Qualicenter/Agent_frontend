/**
 * @author Aldehil Sánchez
 * Component that contains the help window for the agent to
 * request help from the supervisor.
 */

import { useState } from "react";
import "../styles/ventana-ayuda.css";

const VentanaAyuda = (props) => {
  const cancelar = props.cancelar; // Function to close the help window
  const agentInfo = props.agentInfo;
  const clientInfo = props.clientInfo;
  const [message, setMessage] = useState("");

  // Function to send the message to the supervisor
  const enviarMensaje = async () => {
    await fetch("http://localhost:8080/messages/createMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Message: message.toString(),
        Sender: agentInfo ? agentInfo.username : "AgentePrueba",
        Receiver: "supervisor",
        nombreCliente: clientInfo
          ? clientInfo.FirstName + " " + clientInfo.LastName
          : "ClientePrueba",
        generoCliente: clientInfo ? clientInfo.Gender : "Not especificated",
        fechaNacimientoCliente: clientInfo
          ? new Date(clientInfo.BirthDate)
          : new Date(),
        polizaCliente: clientInfo
          ? clientInfo.Attributes.Poliza
          : "Not especificated",
        tipoCliente: clientInfo
          ? clientInfo.PartyTypeString
          : "Not especificated",
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Message sent successfully");
        }
      })
      .catch((error) => {
        alert("Error sending message: " + error);
      });
    cancelar(); // Close the help window
  };

  // Function to handle the message input
  const messageHandler = (e) => {
    setMessage(e.target.value);
  };

  // Function to prevent closing the help window when clicking inside it
  const handleInnerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="ventana-ayuda-completa" onClick={cancelar}>
      <div className="ventana-ayuda" onClick={handleInnerClick}>
        <h1>Help request</h1>
        <label htmlFor="message">Type your message</label>
        <textarea type="text" id="message" onChange={messageHandler}></textarea>
        <button onClick={enviarMensaje}>Send</button>
        <button onClick={cancelar}>Cancel</button>
      </div>
    </div>
  );
};

export default VentanaAyuda;
