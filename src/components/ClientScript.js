import styled from "styled-components";
import { useState } from "react";
import Boton from "./Boton";
import Modal from "./Modal";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 5px;
  border: 2px solid black;

  div.info {
    display: flex;
  }

  h1 {
    margin-bottom: 10px;
  }

  p {
    margin-top: 15px;
  }
`;
const Form = styled.form`
  width: 70%;
  padding: 0;
  display: flex;
  gap: 20px;

  input {
    width: 100%;
    height: 30px;
    border-radius: 5px;
    padding: 10px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    outline: none;
    margin-top: 5px;
  }
`;

const Banner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 500px;
  height: 75px;
  background: rgba(128, 128, 128, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  color: white;
  z-index: 100;
`;

const BotonAyuda = styled.button`
  position: absolute;
  right: 0;
  top: 30%;
  margin: 20px;
  background: #872a7b;
  color: white;
  font-size: 18px;
  padding: 10px;
  font-weight: 600;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
  width: 150px;
`;

const ClientScript = (props) => {
  const [direccion, setDireccion] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [direccion4Url, setDireccion4Url] = useState("");
  const [seBloquea, setBloquear] = useState(true);
  const [ajustadorBanner, setAjustadorBanner] = useState(false);
  const [servicioBanner, setServicioBanner] = useState("");
  const [servicioEnv, setServicioEnv] = useState("");

  const enviarSMS = async () => {
    await fetch("https://localhost:8080/agente/enviarSMS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service: servicioEnv,
        clientName: props.nombre,
        direccion: direccion,
        number: props.clientPhoneNumber,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("SMS enviado");
          alert("Mensaje enviado correctamente");
        }
      })
      .catch((error) => {
        alert("Error al enviar SMS");
        console.log("Error al enviar SMS: " + error);
      });
  };

  const Handler = (event) => {
    event.preventDefault();
    setDireccion(event.target.value);
    setDireccion4Url(
      `https://www.google.com/maps/dir/?api=1&destination=${event.target.value.replace(
        /\s+/g,
        "+"
      )}`
    );
    console.log(direccion);
  };

  const mostrarBanner = (servicio) => {
    setServicioBanner(servicio);
    setAjustadorBanner(true);
    setTimeout(() => setAjustadorBanner(false), 5000);
  };

  const guardar_direccion = (e) => {
    e.preventDefault();
    if (direccion === "") return alert("Ingresa una dirección");
    else {
      console.log("URL para la ubicación en Google Maps: " + direccion4Url);
      setBloquear(false);
      mostrarBanner("Ajustador");
      console.log(props.clientPhoneNumber);
      setServicioEnv("asegurador");
      enviarSMS();
    }
  };

  const borrar_direccion = () => {
    setDireccion("");
    setBloquear(true);
  };

  const mandar_ambulancia = () => {
    console.log("Ambulancia enviada a:" + direccion);
    setServicioEnv("ambulancia");
    enviarSMS();
    setOpenModal(true);
  };

  const mandar_grua = () => {
    console.log("Grua enviada a:" + direccion);
    setServicioEnv("grúa");
    enviarSMS();
    setOpenModal(true);
  };

  return (
    <Container>
      {ajustadorBanner && (
        <Banner>
          {servicioBanner} en camino a {direccion}
        </Banner>
      )}
      <BotonAyuda onClick={props.funcVentanaAyuda}>Request Help</BotonAyuda>
      <h1>Dialogue Script</h1>
      <p>
        <b>1.- You are calling the Qualitas customer service center.</b>
      </p>
      <p>
        <b>2. ¿{props.nombre}, are you okay?</b>
      </p>
      <p>
        <b>3. ¿Where are you currently located?</b>
      </p>
      <Form>
        <input
          type="text"
          placeholder="Write the client's location"
          value={direccion}
          onChange={Handler}
        />
        <Boton action={guardar_direccion} txt="Save location" />
      </Form>
      <Boton action={borrar_direccion} txt="Delete location" />
      <p>
        <b>
          4. (In case he needs medical assistance) An ambulance is on its way to
          your location right now.
        </b>
      </p>
      <Boton
        action={mandar_ambulancia}
        txt="Send Ambulance"
        disabled={seBloquea}
      />
      {openModal && <Modal closeModal={setOpenModal} />}
      <p>
        <b>
          5. ¿{props.nombre}, can your car move or are you in need of a crane to
          assist you?
        </b>
      </p>
      <p>
        <b>6. (In case the car can't move) Perfect, the crane is on its way.</b>
      </p>
      <Boton action={mandar_grua} txt="Enviar Grúa" disabled={seBloquea} />
      {openModal && <Modal closeModal={setOpenModal} />}
      <p>
        <b>
          7. Please note that an adjuster is already on the way to your
          location.
        </b>
      </p>
      <p>
        <b>
          8. Here I can see that you have the following vehicles registered
          [Mention the name of the vehicle or vehicles that are covered by the
          client's insurance policy]. ¿With which vehicle did the accident
          occur?
        </b>
      </p>
      <p>
        <b>
          9. Very well, your policy will cover the following expenses [Mention
          the services that are being covered]
        </b>
      </p>
      <p>
        <b>10. Is there something else I could do for you while you wait?</b>
      </p>
    </Container>
  );
};

export default ClientScript;
