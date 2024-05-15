const BotonAyuda = (props) => {
    const action = props.action

    return (
        <div className="boton-ayuda">
            <button onClick={action}>Ayuda</button>
        </div>
    )
};

export default BotonAyuda;