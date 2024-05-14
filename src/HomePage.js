import styled from "styled-components";
import InfoCliente from "./components/InfoCliente";
import Vehiculos from "./components/Vehiculos";
import ClientScript from "./components/ClientScript";
import VentanaAyuda from "./components/VentanaAyuda";
import ConnectStreamsComponent from "./components/ConnectStreamsComponent";
import { useState } from "react";
import ListaTranscripcion from "./components/ListaTranscripcion";

const Wrapper = styled.main`
  position: relative;
  width: 1194px;
  height: 834px;
  display: flex;
  z-index: 0;
`;

const Left = styled.section`
  width: 35%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Right = styled.section`
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .arriba {
    height: 30%;
    display: flex;
    padding: 10px;
    gap: 20px;
  }

  .abajo {
    height: 70%;
    padding: 10px;
  }
`;

export const HomePage = () => {
  const [showVentanaAyuda, setShowVentanaAyuda] = useState(false);

  const showVentanaHandler = () => {
    setShowVentanaAyuda(!showVentanaAyuda);
  };

  return (
    <Wrapper>
      {showVentanaAyuda && <VentanaAyuda cancelar={showVentanaHandler} />}
      <Left>
        <ListaTranscripcion />
        <ConnectStreamsComponent />
      </Left>
      <Right>
        <div className="arriba">
          <InfoCliente
            nombre="Juan Perez"
            edad="25 años"
            poliza="Platino Ultra"
            tiempoEspera="--:--"
          />
          <Vehiculos />
        </div>
        <div className="abajo">
          <ClientScript nombre="Juan Perez" funcVentanaAyuda={showVentanaHandler} />
        </div>
      </Right>
    </Wrapper>
  );
};
