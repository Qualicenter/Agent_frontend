import { useEffect, useState } from "react";
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
`;


const CardCarro = styled.div`
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${(props) => (props.selected ? " #00A2E3" : "white")};
    color: ${(props) => (props.selected ? "white" : "black")};
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer; 

    &:hover {
        background-color: #f0f0f0;
    }

    .placas {
        text-align: right;
        width: 30%;
    }
`;

const Vehiculos = ({ clientContactId, clientContactInformation, onPolizaSelect }) => { 
    const [vehiculosData, setVehiculosData] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        if (clientContactId && clientContactInformation) {
            const fetchVehiculos = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/cliente/vehicle/get-info/${clientContactInformation.PhoneNumber}`);
                    const data = await response.json();
                    setVehiculosData(data);
                } catch (error) {
                    console.error("Error fetching vehiculos:", error);
                }
            };

            fetchVehiculos();
        }
    }, [clientContactId, clientContactInformation]);

    const handleCardClick = (vehiculo) => {
        setSelectedCar(vehiculo.Placa);
        onPolizaSelect(vehiculo.numPoliza);
    };

    return (
        <Container>
            <h1>Vehiculos Registrados</h1>
            
            {vehiculosData.length > 0 && clientContactId ? (
                vehiculosData.map((vehiculo) => (
                    <CardCarro key={vehiculo.Placa} onClick={() => handleCardClick(vehiculo) } selected={selectedCar === vehiculo.Placa}> 
                        <div>
                            <h3>Vehículo</h3>
                            <p>{vehiculo.Marca} {vehiculo.Modelo} {vehiculo.Año}</p>
                        </div>
                        <div className="placas">
                            <h3>Placas</h3>
                            <p>{vehiculo.Placa}</p>
                        </div>
                    </CardCarro>
                ))
            ) : (
                <p>No hay vehículos registrados.</p>
            )}
        </Container>
    );
};

export default Vehiculos;
