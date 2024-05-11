import styled from "styled-components";
import InfoCliente from "./components/InfoCliente";
import Vehiculos from "./components/Vehiculos";
import ClientScript from "./components/ClientScript";
import VentanaAyuda from "./components/VentanaAyuda";
import ConnectStreamsComponent from "./components/ConnectStreamsComponent";
import { useState } from "react";

const Wrapper = styled.main`
  position: relative;
  width: 1194px;
  height: 834px;
  display: flex;
  z-index: 0;
`;

const Left = styled.section`
  width: 30%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Right = styled.section`
  width: 70%;
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
const BotonAyuda = styled.button`
  position: absolute;
  right: 0;
  top: 30%;
  margin: 20px;
  background: #872a7b;
  color: white;
  font-size: 18px;
  padding: 10px;
  font-weight: 600;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
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
        <ConnectStreamsComponent />
        <BotonAyuda onClick={showVentanaHandler}>Solicitar Ayuda</BotonAyuda>
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
          <ClientScript nombre="Juan Perez" />
        </div>
      </Right>
    </Wrapper>
  );
};
