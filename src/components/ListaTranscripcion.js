import '../styles/lista-transcripcion.css'
import {useCallback, useEffect, useState, useRef} from "react";
import Transcripcion from './Transcripcion';


const ListaTranscripcion = ({ contactId }) => {

  // Datos temporales
  const referencia = useRef();
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

  const scrollToView = () => {
    referencia.current.scrollIntoView({ behavior: 'smooth' });
  };

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