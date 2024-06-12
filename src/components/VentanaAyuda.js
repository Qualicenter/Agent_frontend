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
        generoCliente: clientInfo ? clientInfo.Gender : "No especificado",
        fechaNacimientoCliente: clientInfo
          ? new Date(clientInfo.BirthDate)
          : new Date(),
        polizaCliente: clientInfo
          ? clientInfo.Attributes.Poliza
          : "No especificado",
        tipoCliente: clientInfo
          ? clientInfo.PartyTypeString
          : "No especificado",
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Mensaje enviado");
          alert("Mensaje enviado correctamente");
        }
      })
      .catch((error) => {
        alert("Error al enviar mensaje");
      });
    cancelar(); // Close the help window
  };

  // Function to handle the message input
  const messageHandler = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };

  // Function to prevent closing the help window when clicking inside it
  const handleInnerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="ventana-ayuda-completa" onClick={cancelar}>
      <div className="ventana-ayuda" onClick={handleInnerClick}>
        <h1>Solicitud de ayuda</h1>
        <label htmlFor="message">Ingrese su mensaje</label>
        <textarea type="text" id="message" onChange={messageHandler}></textarea>
        <button onClick={enviarMensaje}>Enviar</button>
        <button onClick={cancelar}>Cancelar</button>
      </div>
    </div>
  );
};

export default VentanaAyuda;
