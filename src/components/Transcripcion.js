import "../styles/transcripcion.css";

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
    "lugar" +
    (transcripcion.rol === "AGENT"
      ? "agente"
      : transcripcion.rol === "CUSTOMER"
      ? "cliente"
      : "");

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

  return (
    <div className={estiloTranscripcion}>
      <div className={lugarTranscripcion}>
        {emoji} {transcripcion.descripcion}
      </div>
    </div>
  );
};

export default Transcripcion;
