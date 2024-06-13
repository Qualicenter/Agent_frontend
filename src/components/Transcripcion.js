/**
 * @author Angel Armando Marquez Curiel
 * @author
 * @author
 * 
 * Component that displays the transcription of the active call
*/

import "../styles/transcripcion.css";
import "../styles/lista-transcripcion.css";


const Transcripcion = ({ transcripcion }) => {

  /*Assigns the sentiment style of a messaage so it can display its color*/
  const estiloTranscripcion =
    "mensaje " +
    (transcripcion.Transcript.Sentiment === "POSITIVE"
      ? "positivo"
      : transcripcion.Transcript.Sentiment === "NEGATIVE"
      ? "negativo"
      : transcripcion.Transcript.Sentiment === "NEUTRAL"
      ? "neutral"
      : "");

  /*Assigns the place of a message*/
  const lugarTranscripcion =
    (transcripcion.Transcript.ParticipantRole === "AGENT"
      ? "agente"
      : "cliente");

  /*Assigns an emoji to a message depending on its sentiment*/
  let emoji;
  switch (transcripcion.Transcript.Sentiment) {
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

  /*Returns all the messages with the style and place assigned*/
  return (
    <div className="ventana-transcripcion">
      <div className={`${estiloTranscripcion} ${lugarTranscripcion}`}>
        <div>
          {emoji} {transcripcion.Transcript.Content}
        </div>
      </div>
    </div>
  );
};

export default Transcripcion;
