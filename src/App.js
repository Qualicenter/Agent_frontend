import styled from "styled-components";
import InfoCliente from "./components/InfoCliente";
import Vehiculos from "./components/Vehiculos";
import ClientScript from "./components/ClientScript";
import TituloAcciones from "./components/TituloAcciones";
import BotonAyuda from "./components/BotonAyuda";
import Transcripcion from "./components/Transcripcion";
import { useState } from "react";
import VentanaAyuda from "./components/VentanaAyuda";
import {useTypewriter, Cursor} from 'react-simple-typewriter';

const Wrapper = styled.main`
    position: relative;
    width: 1194px;
    height: 834px;
    display: flex;
    z-index: 0;
`

const Left = styled.section`
    width: 30%;
    height: 100%;
    background-color: #f0f0f0;
    display: flex;
    flex-direction: column;
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
    const {info} = useTypewriter({
        
        words: ['Agente', 'Cliente', 'Supervisor'],
        loop: true,
        deleteSpeed: 50,
        typeSpeed: 100,
        delaySpeed: 2000,
        
    });
    const [showVentanaAyuda, setShowVentanaAyuda] = useState(false);

    const showVentanaHandler  = () => {
        setShowVentanaAyuda(!showVentanaAyuda)
    }

    return (
        <Wrapper>
            {showVentanaAyuda && <VentanaAyuda cancelar={showVentanaHandler}/>}
            <Left>
                <h1 className="ventana-transcripcion">
                    Soy un
                    <Transcripcion text={info}/>
                    <Cursor />
                </h1>
                <h1>Aqui podra contestar la llamada el agente</h1>
                <TituloAcciones text="Acciones Rápidas"/>
                <BotonAyuda action={showVentanaHandler}/>  
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
