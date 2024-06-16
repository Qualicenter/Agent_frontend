/** 
 * @author Gerardo Rios Mejía
 * Code where the feedback from the supervisor is displayed
 */

import preguntas from "./Titulos";
import { useState, useEffect, useCallback } from "react";
import "../styles/comentarios.css";

function Comentario({ Agent }) {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [comments, setComments] = useState([]);
  const [score, setScore] = useState(null);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);

  /**Function to move to the next question */
  const Siguiente = () => {
    setCurrentCommentIndex((prevIndex) => prevIndex + 1);
    setPreguntaActual((prevPreguntaActual) => (prevPreguntaActual + 1) % preguntas.length);
  };

  /**Function to move to the previous question */
  const Anterior = () => {
    setCurrentCommentIndex((prevIndex) => prevIndex - 1);
    setPreguntaActual((prevPreguntaActual) => (prevPreguntaActual - 1 + preguntas.length) % preguntas.length);
  };

  /** API to retrieve feedback*/
  const [url] = useState(`http://localhost:8080/EncuestaModel/getEncuesta`);

  /**Function to download the API */
  const descargar = useCallback(async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (Agent) {
        const agentData = data.find(item => item.username === Agent);
        if (agentData) {
          console.log("Datos encontrados para el agente:", agentData);
          setComments(agentData.comment);
          setScore(agentData.score);
        } else {
          console.log("No se encontró ningún agente con ese nombre de usuario");
        }
      } else {
        console.warn('Agent is null or undefined');
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [url, Agent]);

  /**useEffect to fetch data when the component mounts and when the descargar function changes*/
  useEffect(() => {
    descargar();
  }, [descargar]);

  /** Return of the layout where the agent can observe their feedback */
  return (
    <div className='boton'>
      <div className='comentarios'>
        <h1 className='titulo-principal'>Weekly Performance: {score} </h1>

        <h2 className='titulo-secundario'>Question {preguntaActual + 1} of {preguntas.length}</h2>

        <div className='titulo-pregunta'>{preguntas[preguntaActual].titulo}</div>

        <div className='comentario'>
          {comments.length > 0 && <p>{comments[currentCommentIndex]}</p>}
        </div>

        <div className='btn'>
          <button onClick={Anterior} disabled={preguntaActual === 0}>Previous</button>
          <button onClick={Siguiente} disabled={preguntaActual === preguntas.length - 1}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Comentario;