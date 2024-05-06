import { useState } from "react";
import "../styles/direccion.css";

const Direccion = (props) => {
  const [direccion, setDireccion] = useState("");

  const Handler = (event) => {
    event.preventDefault();
    setDireccion(event.target.value);
    console.log(direccion);
  };

  const mandar_grua = () => {
    console.log("Grua enviada a:" + direccion);
  };

  const mandar_ambulancia = () => {
    console.log("Ambulancia enviada a:" + direccion);
  };

  return (
    <div>
      <form className="direccion">
        <label htmlFor="direccion">Dirección:</label>
        <input
          type="text"
          placeholder="Escribe la dirección del cliente"
          onChange={Handler}
        ></input>
      </form>
      <button className="botones" onClick={mandar_ambulancia}>
        Ambulancia
      </button>
      <button className="botones" onClick={mandar_grua}>
        Grúa
      </button>
    </div>
  );
};

export default Direccion;
