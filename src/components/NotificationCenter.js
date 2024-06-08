/**
 * @author Mariluz Daniela Sánchez Morales
 * @author Pablo Spínola López 
 * Notification center that stores messages sent by the supervisor to the logged-in agent.
*/
import "../styles/notificationCenter.css";
import React, { useCallback, useEffect, useState } from "react";
import ReactSwitch from "react-switch";
import Comentario from "./Comentarios";

const NotificationCenter = ({Agent}) => {
  /* Notificaion center view states */
  const [activeView, setActiveView] = useState("Notifications");
  const [mostrarApp, setMostrarApp] = useState(false);

  /* Current date variables */
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  /* Effect where it is ensured that the agent username is obtained before calling the api*/
  useEffect(() => {
    const hostUrl = "http://localhost:8080/messages/getMessages";
    if (Agent !== null) {
      setUrl(`${hostUrl}?Sender=supervisor&Receiver=${Agent.username}&Date=${year}-${month}-${day}`);
    } else {
      setUrl(`${hostUrl}?Sender=supervisor&Receiver=AgentePrueba&Date=${year}-${month}-${day}`);
    }
  }, [Agent, year, month, day]); 

  /* Endpoint state where received messages are downloaded */
  const [url, setUrl] = useState(""); 

  /* Function to change view of the notification center */
  const handleViewChange = (checked) => {
    setActiveView(checked ? "Performance" : "Notifications");
  };

  /* State to store notifications */
  const [notifications, setNotifications] = useState([]);

  /* Function that fetches data from DB and updates the notifications state. */
  const descargar = useCallback(async () => {
    try {
      if (url === "") {
        return;
      }
      console.log(`Fetching data from: ${url}`);
      const response = await fetch(url);
      const data = await response.json();
      if (data[0].Items && Array.isArray(data[0].Items)) {
        const items = data[0].Items;
        const arrNuevo = items.filter((item) => item.Message !== undefined).map((item) => {
          const { Sender, Message } = item;
          return {
            sender: Sender,
            content: Message || '',
          };
        });
        setNotifications(arrNuevo)
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [url]);

  /* Effect that downloads messages from the database.*/
  useEffect(() => {
    descargar();
  }, [descargar]);


  /* Component states */
  const toggleCerrarApp = () => {
    setMostrarApp(!mostrarApp)
    setActiveView("Notifications")
  }

  const toggleMostrarApp = () => {
    setMostrarApp(true);
  };
  
  /*Return of the Notification Center layout*/
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
              <Comentario Agent={Agent.username}/>
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