import styled from "styled-components";
import InfoComponent from "./InfoComponent";

const Container = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: left;
    padding: 5px;
    border: 2px solid black;

    div.info {
        display: flex;
    }
`

const Column = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const InfoCliente = ( props ) => {
    return (
        <Container>
            <h1>Información del Cliente</h1>
            <div className="info">
                <Column>
                    <InfoComponent title="Nombre" content={props.nombre} />
                    <InfoComponent title="Póliza" content={props.poliza} />
                </Column>
                <Column>
                    <InfoComponent title="Edad" content={props.edad} />
                    <InfoComponent title="Tiempo en Espera" content={props.tiempoEspera} />
                </Column>
            </div>
        </Container>
    )

}

export default InfoCliente;