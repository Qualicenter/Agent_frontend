import '../styles/transcripcion.css'

const Transcripcion = ({transcripcion}) =>{
    const estiloTranscripcion = "mensaje " + 
    (transcripcion.sentiment === 'POSITIVE' ? "positivo" :
    transcripcion.sentiment === 'NEGATIVE' ? "negativo" :
    transcripcion.sentiment === 'NEUTRAL' ? "neutral": "");
    
    const lugarTranscripcion = "lugar" +
    (transcripcion.rol === 'AGENT' ? "agente" :
    transcripcion.rol === 'CUSTOMER' ? "cliente" : "");
    


    return (
        
        <div className={estiloTranscripcion}>
            <div className={lugarTranscripcion}>
                {transcripcion.descripcion}
            </div>
        </div>
    )

}

export default Transcripcion;