import {useCallback, useEffect, useState, useRef} from "react";
import { v4 as uuidv4 } from 'uuid';
import Transcripcion from './Transcripcion';
import '../styles/lista-transcripcion.css'



const ListaTranscripcion = () => {
  // Datos temporales
  const referencia = useRef();
  const [arrTranscripcion, setTranscripcion] = useState([]);
  const [url] = useState("http://localhost:8080/agente/consultaTranscripcionPrueba");
  

  const descargar = useCallback(async () => {
    try {
      const response = await fetch(url);
      const data  = await response.json();
      const arrNuevo = data[0].Segments.map((segment) => {
        const transcripcion = {
          id: uuidv4(),
          descripcion: segment.Transcript.Content,
          sentiment: segment.Transcript.Sentiment,
          rol: segment.Transcript.ParticipantRole,
        };
        return transcripcion;
      });
     
      setTranscripcion(arrNuevo);
      
    } catch (error) {
      console.error('Error al descargar los datos:', error);
    }
  }, [url]);

  useEffect(() => {
    
    const interval = setInterval(descargar, 3000); // Descargar cada 5 segundos
    return () => clearInterval(interval); // Limpiar intervalo al desmontar el componente
  }, [descargar]);

  const scrollToView = () => {
    referencia.current.scrollIntoView({ behavior: 'smooth' });
  };

    return(
        <div className="ventana">
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