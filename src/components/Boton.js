/**
 * @author Eduardo Francisco Lugo Quintana
 * Component that displays the button used in the client script
*/


import styled from "styled-components";

/* Style characteristics for the button */
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

    &:disabled {
        background: grey;
        cursor: not-allowed;
    }
`

const Boton = (props) => {
    const { action, txt, disabled } = props;
    return (
        <Button onClick={action} disabled={disabled}>{txt}</Button>
    );
}

export default Boton
