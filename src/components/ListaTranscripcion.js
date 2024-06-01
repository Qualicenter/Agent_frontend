import '../styles/lista-transcripcion.css'
import {useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Transcripcion from './Transcripcion';


const ListaTranscripcion = ({ contactId }) => {

  // Datos temporales
  const [arrTranscripcion, setTranscripcion] = useState([]);
  const [url] = useState("http://localhost:8080/agente/consultaTranscripcion2");

  
  const descargar = useCallback(async () => {
    try {
      if (!contactId) {
        console.error("No contactId provided");
        return;
      }

      console.log(`Fetching data from: ${url}/${contactId}`);
      const response = await fetch(`${url}/${contactId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data fetched successfully:", data[0].Segments);
      setTranscripcion(data[0].Segments);
      console.log("ArrTranscripcion" + data[0])
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [url, contactId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      descargar();
    }, 3000); // Fetch every 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [descargar]);

    return(
        <h1 className="ventana-transcripcion">
          <span style={{fontWeight: 'bold', color: 'green'}}>
            {arrTranscripcion.length !== 0 ? (
              arrTranscripcion.map((transcripcion) => {
                return (
                  <Transcripcion
                  transcripcion={transcripcion}
                  key={transcripcion.id}
                  />
                );
              })
            ) : (
              <h1>...</h1>
            )}
          </span>
        </h1>
  )
  
}

export default ListaTranscripcion;