import styled from "styled-components";
import InfoCliente from "./components/InfoCliente";
import Vehiculos from "./components/Vehiculos";
import ClientScript from "./components/ClientScript";
import TitleComponent from "./components/Title";
import TituloAcciones from "./components/TituloAcciones";

const Wrapper = styled.main`
    position: relative;
    width: 1194px;
    height: 834px;
    display: flex;
`

const Left = styled.section`
    width: 30%;
    height: 100%;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Right = styled.section`
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .arriba {
        height: 30%;
        display: flex;
        padding: 10px;
        gap: 20px
    }

    .abajo {
        height: 70%;
        padding: 10px;
    }
`

function App() {
    return (
        <Wrapper>
            <Left>
                <h1>Aqui podra contestar la llamada el agente</h1>
                <TituloAcciones text="Acciones Rápidas"/>
            </Left>
            <Right>
                <div className="arriba">
                    <InfoCliente nombre="Juan Perez" edad="25 años" poliza="Platino Ultra" tiempoEspera="--:--"/>
                    <Vehiculos />
                </div>
                <div className="abajo">
                    <ClientScript nombre="Juan Perez"/>
                </div>
            </Right>
        </Wrapper>
    );
        
        
}

export default App;
