/**
 * @author Eduardo Francisco Lugo Quintana
 * Subcomponent that displays a title and content for the client information
*/

import styled from "styled-components"

// Style characteristics for the info component
const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;

    h2 {
        font-size: 18px;
        margin-top: 10px;
}
`

const InfoComponent = ( props ) => {
    return (
        <Div>
            <h2>{props.title}</h2>
            <p>{props.content}</p>
        </Div>
    )
}

export default InfoComponent