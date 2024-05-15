import { useRef } from "react";
import "../styles/ventana-ayuda.css";

const VentanaAyuda = (props) => {
    const cancelar = props.cancelar
    const inputRef = useRef();

    const enviarMensaje = (message) => {
        console.log(message)
        cancelar()
    }

    return (
        <div className="ventana-ayuda-completa">
            <div className="ventana-ayuda">
                <h1>Solicitud de ayuda</h1>
                <label for="message">Ingrese su mensaje</label>
                <input type="text" id="message" ref={inputRef}></input>
                <button onClick={() => enviarMensaje(inputRef.current.value)}>Enviar</button>
                <button onClick={cancelar}>Cancelar</button>
            </div>
        </div>
    )
};

export default VentanaAyuda;