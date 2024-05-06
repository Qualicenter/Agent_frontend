import styled from "styled-components";
import { useState } from "react";   
import Boton from "./Boton";

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: left;
    padding: 5px;
    border: 2px solid black;

    div.info {
        display: flex;
    }

    h1 {
        margin-bottom: 10px;
    }

    p {
        margin-top: 15px;
    }
`
const Form = styled.form`
    width: 70%;
    padding: 0;

    input {
        width: 100%;
        height: 30px;
        border-radius: 5px;
        padding: 10px;
        border: none;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
        outline: none;
        margin-top: 5px;
    }
`

const ClientScript = ( props ) => {
    const [direccion, setDireccion] = useState("");

    const Handler = (event) => {
        event.preventDefault();
        setDireccion(event.target.value);
        console.log(direccion);
    };

    const mandar_ambulancia = () => {
        console.log("Ambulancia enviada a:" + direccion);
    };

    const mandar_grua = () => {
        console.log("Grua enviada a:" + direccion);
    };

    return (
        <Container>
            <h1>Guión de Diálogo</h1>
            <p><b>1.- Esta usted llamando al centro de atención de Qualitas</b></p>
            <p><b>2. ¿{props.nombre}, se encuentra usted bien?</b></p>
            <p><b>3. ¿En qué ubicación se encuentra?</b></p>
            <Form>
                <input
                type="text"
                placeholder="Escribe la dirección del cliente"
                onChange={Handler}
                ></input>
            </Form>
            <p><b>4. (En caso de que necesite asistencia médica) Esta llegando una ambulancia a su ubicación.</b></p>
            <Boton action={mandar_ambulancia} txt="Enviar Ambulancia"/>
            <p><b>5. ¿{props.nombre}, su coche puede moverse o necesita una grúa que lo asista?</b></p>
            <p><b>6. (En caso de que no se pueda mover)  Perfecto, ya va la grúa en camino</b></p>
            <Boton action={mandar_grua} txt="Enviar Grúa"/>
            <p><b>7. Tenga en cuenta un ajustador ya va en camino a su dirección</b></p>
            <p><b>8. Aquí me aparece que tiene registrado/s [Menciona el nombre de el o los vehiculos cubiertos por su poliza]. ¿En cuál vehiculo ocurrio el accidente?</b></p>
            <p><b>9. Muy bien, su poliza va a cubrir los siguientes gastos [Menciona los servicios que estan siendo cubiertos]</b></p>
            <p><b>10. ¿Hay algo más que pueda hacer por usted en este momento mientras espera?</b></p>
        </Container>
    )

}

export default ClientScript;