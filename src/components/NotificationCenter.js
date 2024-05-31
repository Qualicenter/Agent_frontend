// NotificationCenter.js
import "../styles/notificationCenter.css";
import React, { useCallback, useEffect, useState } from "react";
import ReactSwitch from "react-switch";
import Comentario from "./Comentarios";

const NotificationCenter = ({Agent}) => {
  //Estado de la vista del centro de notificaciones
  const [activeView, setActiveView] = useState("Notifications");
  const [mostrarApp, setMostrarApp] = useState(false);
  const [username, setUsername] = useState(null);

  //Variable de fecha actual
  const today = new Date();

  //Efecto donde se guarda el dato de username de agente
  useEffect(() => {
    if (Agent !== null) {
      setUsername(Agent.username);
    }
  }, [Agent]); 

  //Estado del endpoint donde se descargan los mensajes recibidos
  const [url] = useState(`http://localhost:8080/messages/getMessages?Sender=supervisor&Receiver=DanielaSanchez&Date=${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`); 

  //Función para cambiar vista del centro de notificaciones
  const handleViewChange = (checked) => {
    setActiveView(checked ? "Performance" : "Notifications");
  };

  // Estado para almacenar las notificaciones 
  const [notifications, setNotifications] = useState([]);

  const descargar = useCallback(async () => {
  
    const response = await fetch(url);
    const data = await response.json();
    if (data[0].Items && Array.isArray(data[0].Items)) {
      const items = data[0].Items;
      const arrNuevo = items.filter((item) => item.Message !== undefined).map((item) => {
        const { Sender, Message } = item;
        return {
          sender: Sender,
          content: Message || '', // En caso de que no exista un mensaje
        };
      });
      setNotifications(arrNuevo)
    } 
  }, [url]);

  // Efecto de descarga de mensajes de la base de datos
  useEffect(() => {
    descargar();
  }, [descargar]);


  //Estados del componente
  const toggleCerrarApp = () => {
    setMostrarApp(!mostrarApp)
    setActiveView("Notifications")
  }

  const toggleMostrarApp = () => {
    setMostrarApp(true);
  };

  return (
    <div className="notifCenter-center">
      {mostrarApp &&(
        <div className="ventana-noticenter-completa">
          <div className="notification-center">
            <ReactSwitch onChange={handleViewChange} checked={activeView === "Performance"}/>
            <h2> {activeView === "Performance" ? "Weekly Performance" : "Notification Center"} </h2>
            {activeView === "Notifications" ? (
              <ul>
                {notifications.map((notif) => (
                  <li key={notif.id}>
                    <strong>{notif.sender}:</strong> {notif.content}
                  </li>
                ))}
              </ul>
            ) : (
              <Comentario/>
            )}
            <button className="my-button" onClick={toggleCerrarApp}>Close</button>
          </div>
        </div>
      )}
      <button className="my-button" onClick={toggleMostrarApp}>Notification Center</button>
    </div>

  );
};

export default NotificationCenter;