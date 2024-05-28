import styled from "styled-components";

const Container = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: left;
    padding: 20px;
    border: 2px solid black;
    gap: 20px;
    overflow: scroll;
`

const VehiculosData = [
    {
        id: 1,
        carro: "Jeep Cherokee",
        placas: "ASD242L"
    },
    {
        id: 2,
        carro: "Volkswagen Vento",
        placas: "AD144OM"
    },
    {
        id: 3,
        carro: "Renault Duster",
        placas: "FO3Q14R"
    }, 
    {
        id: 4,
        carro: "Chevrolet Spark",
        placas: "ASD242L"
    }
]

const CardCarro = styled.div`
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .placas {
        text-align: right;
    }
`

const Vehiculos = ({ clientVehicles }) => {
    return (
        <Container>
            <h1>Vehiculos Registrados</h1>
            
            {clientVehicles !== null ? (
                VehiculosData.map((vehiculo) => (
                    <CardCarro key={vehiculo.id}>
                        <div>
                            <h3>Vehículo</h3>
                            <p>{vehiculo.carro}</p>
                        </div>
                        <div className="placas">
                            <h3>Placas</h3>
                            <p>{vehiculo.placas}</p>
                        </div>
                    </CardCarro>
                ))
            ) : (
                <p>No hay vehículos registrados.</p>
            )}
        </Container>
    )
}


export default Vehiculos;