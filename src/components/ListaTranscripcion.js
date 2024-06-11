/**
 * @author Angel Armando Marquez Curiel
 * @author
 * @author
 * 
 * Component that downloads the transcription of the active call and uses Transcripcion.js to display it
*/

import '../styles/lista-transcripcion.css'
import {useCallback, useEffect, useState, useRef} from "react";
import Transcripcion from './Transcripcion';

const ListaTranscripcion = ({ contactId }) => {

   /*State variables and props from parent component*/
  const referencia = useRef();
  const [arrTranscripcion, setTranscripcion] = useState([]);
  const [url] = useState("http://localhost:8080/agente/consultaTranscripcion2");

  
  /*Function to fetch the transcription of the conversation*/
  const descargar = useCallback(async () => {
    try {
      if (!contactId) {
        console.error("No contactId provided");
        setTranscripcion([]);
        return;
      }

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
      
      setTranscripcion(data[0].Segments);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [url, contactId]);

  /*Fetch transcription data when component mounts*/
  useEffect(() => {
    const intervalId = setInterval(() => {
      descargar();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [descargar]);

  /*Function to scroll to the bottom of the transcription*/
  const scrollToView = () => {
    referencia.current.scrollIntoView({ behavior: 'smooth' });
  };

  /*Return the transcription of the conversation*/
  return(
    <div className="ventana">
        {arrTranscripcion.length > 0 && (
          <div onClick={scrollToView} style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'orange',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}>Scroll</div>
        )}
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
        <div ref={referencia}></div>
    </div>
  )
  
}

export default ListaTranscripcion;