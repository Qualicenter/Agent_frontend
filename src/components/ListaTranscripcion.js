import '../styles/lista-transcripcion.css'
import {useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Transcripcion from './Transcripcion';



const ListaTranscripcion = ({clientContactId}) => {
  // Datos temporales

  const [arrTranscripcion, setTranscripcion] = useState([]);
  const [url] = useState("https://marmoset-rested-moccasin.ngrok-free.app/agente/consultaTranscripcion2");

  const descargar = useCallback(async () => {
    // try {
    //   if (clientContactId === null) {
    //     return;
    //   }
    //   fetch(`${url}?contactId=${clientContactId}`, {
    //     method: 'GET',
    //     headers: {
    //       'Accept': 'application/json',
    //     }
    //   }).then((response) => {
    //     if (response) {
    //       console.log('Respuesta:', response);
    //       const data = response.json();
    //     }
    //   }).then((data) => {
    //     const arrNuevo = data[0].Segments.map((segment) => {
    //       const transcripcion = {
    //         id: uuidv4(),
    //         descripcion: segment.Transcript.Content,
    //         sentiment: segment.Transcript.Sentiment,
    //         rol: segment.Transcript.ParticipantRole,
    //       }
    //       return transcripcion;
    //     });
    //   }).then((arrNuevo) => {
    //     setTranscripcion(arrNuevo);
    //   }).catch((error) => {
    //     console.error('Error al descargar los datos:', error);
    //   });
    // } catch (error) {
    //   console.error('Error al descargar los datos:', error);
    // }

    // try {
    //   if (clientContactId === null) {
    //     return;
    //   }
    //   fetch("https://marmoset-rested-moccasin.ngrok-free.app/messages/prueba", {
    //     method: 'GET',
    //     headers: {
    //       'Accept': 'application/json',
    //     }
    //   }).then((response) => {
    //     console.log('Respuesta:', response);
    //   }).catch((error) => {
    //     alert('Error al descargar los datos:', error);
    //   });
    // } catch (error) {
    //   console.error('Error al descargar los datos:', error);
    // }
  }, [url, clientContactId]);

  useEffect(() => {
    const interval = setInterval(descargar, 3000); // Descargar cada 5 segundos
    return () => clearInterval(interval); // Limpiar intervalo al desmontar el componente
  });


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