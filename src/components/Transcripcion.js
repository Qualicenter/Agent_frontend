import "../styles/transcripcion.css";
import '../styles/lista-transcripcion.css'
import {useRef} from "react";

const Transcripcion = ({ transcripcion }) => {
  

  const estiloTranscripcion =
    "mensaje " +
    (transcripcion.sentiment === "POSITIVE"
      ? "positivo"
      : transcripcion.sentiment === "NEGATIVE"
      ? "negativo"
      : transcripcion.sentiment === "NEUTRAL"
      ? "neutral"
      : "");

  const lugarTranscripcion =
    transcripcion.rol === "AGENT"
      ? "agente"
      : transcripcion.rol === "CUSTOMER"
      ? "cliente"
      : "";

  let emoji;
  switch (transcripcion.sentiment) {
    case "POSITIVE":
      emoji = "😊";
      break;
    case "NEGATIVE":
      emoji = "😠";
      break;
    case "NEUTRAL":
      emoji = "😐";
      break;
    default:
      emoji = "";
  }

  
  //dummy.current.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="ventana-transcripcion">
      <div className={lugarTranscripcion}>
        <div className={estiloTranscripcion}>
          {emoji} {transcripcion.descripcion}
        </div>
      </div>
      
    </div>
    
  );
};

export default Transcripcion;
