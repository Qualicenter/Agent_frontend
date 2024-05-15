import styled from "styled-components";
import Direccion from "./Direccion";

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 22px;
  margin-top: 22px;
  text-align: center;
  border: 1px solid yellow;
`;

const TituloAcciones = (props) => {
  return <Title>{props.text}
  <Direccion/></Title>;
};

export default TituloAcciones;