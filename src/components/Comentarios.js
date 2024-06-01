import preguntas from "./Titulos";
import { useState } from "react";
import "../styles/comentarios.css";

function Comentario() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  // const [mostrarApp, setMostrarApp] = useState(true);

  const Siguiente = () => {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      setPreguntaActual(0);
    }
  };

  const Anterior = () => {
    if (preguntaActual > 0) {
      setPreguntaActual(preguntaActual - 1);
    } else {
      setPreguntaActual(preguntas.length - 1);
    }
  };

  // const toggleMostrarApp = () => {
  //   setMostrarApp(!mostrarApp);
  // };

return (
    <div className='boton'>
      <div className='comentarios'>

        <h1 className='titulo-principal'>Weekly Performance:</h1>
        
        <h2 className='titulo-secundario'>Question {preguntaActual + 1} of 10</h2>

        <div className='titulo-pregunta'>{preguntas[preguntaActual].titulo}</div>

        <div className='comentario'></div>

        <div className='btn'>
          <button onClick={Anterior}>Previous</button>
          <button onClick={Siguiente}>Next</button>
        </div>
      </div>
    </div>
);
}



export default Comentario;