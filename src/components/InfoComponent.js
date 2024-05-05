import styled from "styled-components"

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