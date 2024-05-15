import styled from "styled-components";
import InfoComponent from "./InfoComponent";

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: left;
    padding: 5px;
    border: 2px solid black;
    gap: 20px;

    div.info {
        display: flex;
    }

    h1 {
        margin-bottom: 10px;
    }
`

const Column = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const ClientScript = ( props ) => {
    return (
        <Container>
            <h1>Guión de Diálogo</h1>
            <p><b>1.- Esta usted llamando al centro de atención de Qualitas</b></p>
            <p><b>2. ¿{props.nombre}, se encuentra usted bien?</b></p>
            <p><b>3. ¿En qué ubicación se encuentra?</b></p>
            <p><b>4. (En caso de que necesite asistencia médica) Esta llegando una ambulancia a su ubicación.</b></p>
            <p><b>5. ¿{props.nombre}, su coche puede moverse o necesita una grúa que lo asista?</b></p>
            <p><b>6. (En caso de que no se pueda mover)  Perfecto, ya va la grúa en camino</b></p>
            <p><b>7. Tenga en cuenta un ajustador ya va en camino a su dirección</b></p>
            <p><b>8. Aquí me aparece que tiene registrado/s [Menciona el nombre de el o los vehiculos cubiertos por su poliza]. ¿En cuál vehiculo ocurrio el accidente?</b></p>
            <p><b>9. Muy bien, su poliza va a cubrir los siguientes gastos [Menciona los servicios que estan siendo cubiertos]</b></p>
            <p><b>10. ¿Hay algo más que pueda hacer por usted en este momento mientras espera?</b></p>
        </Container>
    )

}

export default ClientScript;