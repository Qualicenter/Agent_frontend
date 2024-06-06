import "../styles/transcripcion.css";
import "../styles/lista-transcripcion.css";

const Transcripcion = ({ transcripcion }) => {
  const estiloTranscripcion =
    "mensaje " +
    (transcripcion.Transcript.Sentiment === "POSITIVE"
      ? "positivo"
      : transcripcion.Transcript.Sentiment === "NEGATIVE"
      ? "negativo"
      : transcripcion.Transcript.Sentiment === "NEUTRAL"
      ? "neutral"
      : "");

  const lugarTranscripcion =
    (transcripcion.Transcript.ParticipantRole === "AGENT"
      ? "agente"
      : "cliente");

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
