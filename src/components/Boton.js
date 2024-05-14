import styled from "styled-components";

const Button = styled.button`
    width: 127px;
    height: 27px;
    background: #00A2E3;
    color:  white;
    font-size: 12px;
    font-weight: 600;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-top: 5px;
    cursor: pointer;
`

const Boton = (props) => {
    return (
        <Button onClick={props.action}>{props.txt}</Button>
    );
}

export default Boton