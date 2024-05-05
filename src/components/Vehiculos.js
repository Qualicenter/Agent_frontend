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
    gap: 20px;

    ul {
        list-style-type: none;
        padding: 0;
    }

    ul li {
        margin-bottom: 10px;
    };
`

const Column = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const Vehiculos = ( props ) => {
    return (
        <Container>
            <h1>Vehiculos Registrados</h1>
            <ul>
                <li>Auto 1</li>
                <li>Auto 2</li>
                <li>Auto 3</li>
            </ul>
        </Container>
    )

}

export default Vehiculos;