import styled from "styled-components";
import TitleComponent from "./components/Title";

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 40% 60%;
  grid-gap: 10px;
  height: 100vh;
`;

const LeftColumn = styled.div`
  display: grid;
  grid-template-rows: 50% 50%;
  justify-items: center;
`;

const RightColumn = styled.div`
  display: grid;
  grid-template-rows: 33.33% 33.33% 33.33%;
  justify-items: center;
`;

function App() {
  return (
    <Wrapper>
      <LeftColumn>
        <TitleComponent text="Acciones Rápidas" />
        <TitleComponent text="Transcripción" />
      </LeftColumn>
      <RightColumn>
        <TitleComponent text="Métricas Llamadas" />
        <TitleComponent text="Información del cliente" />
        <TitleComponent text="Botones llamada" />
      </RightColumn>
    </Wrapper>
  );
}

export default App;
