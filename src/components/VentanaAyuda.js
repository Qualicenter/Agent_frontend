import { useState } from "react";
import "../styles/ventana-ayuda.css";

const VentanaAyuda = (props) => {
    const cancelar = props.cancelar;
    const [message, setMessage] = useState("");

    const enviarMensaje = async () => {
        await fetch("http://localhost:8080/messages/createMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Message: message.toString(),
                Sender: "Agente Prueba",
                Receiver: "supervisor"
            }),
        }).then((response) => {
            if (response.ok) {
                console.log("Mensaje enviado");
                alert("Mensaje enviado correctamente");
            }
        }).catch((error) => {
            alert("Error al enviar mensaje");
            console.log("Error al enviar mensaje: " + error);
        });
        console.log(message)
        cancelar()
    }

    const messageHandler = (e) => {
        setMessage(e.target.value)
        console.log(message)
    }

    const handleInnerClick = (e) => {
        e.stopPropagation();
    }

    return (
        <div className="ventana-ayuda-completa" onClick={cancelar}>
            <div className="ventana-ayuda" onClick={handleInnerClick}>
                <h1>Solicitud de ayuda</h1>
                <label htmlFor="message">Ingrese su mensaje</label>
                <textarea type="text" id="message" onChange={messageHandler}></textarea>
                <button onClick={enviarMensaje}>Enviar</button>
                <button onClick={cancelar}>Cancelar</button>
            </div>
        </div>
    )
};

export default VentanaAyuda;