import styled from "styled-components";
import TitleComponent from "./components/Title";
import TituloAcciones from "./components/TituloAcciones";

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 40% 60%;
  grid-gap: 10px;
  height: 100vh;
  border: 1px solid black;
`;

const LeftColumn = styled.div`
  display: grid;
  grid-template-rows: 50% 50%;
  justify-items: center;
  border: 1px solid orange;
`;

const DireccionContainer = styled.div`
  position: absolute; 
  top: 50%; 
  transform: translateY(-50%);
  border: 1px solid green;
`;

const BotonesContainer = styled.div`
  position: absolute; 
  top: 50%; 
  transform: translateY(-50%);
  margin-top: -200px;
  display: flex;
  border: 1px solid red;
`;

const RightColumn = styled.div`
  display: grid;
  grid-template-rows: 33.33% 33.33% 33.33%;
  justify-items: center;
  border: 1px solid purple;
`;

function App() {
  return (
    <Wrapper>
      <LeftColumn>
        <TituloAcciones text="Acciones Rápidas"/>
        <TitleComponent text="Transcripción"/>
      </LeftColumn>
      <RightColumn>
        <TitleComponent text="Métricas Llamadas"/>
        <TitleComponent text="Información del cliente" />
        <TitleComponent text="Botones llamada" />
      </RightColumn>
    </Wrapper>
  );
}

export default App;
