/**
 * @author Abigail Donají Chávez Rubio
 * @author
 * @author
 * Component containing the script for the client's call, the capture of the client's address,
 * the sending of the ambulance, crane and the adjuster
*/

import styled from "styled-components";
import { useState, useEffect} from "react";
import Boton from "./Boton";
import Modal from "./Modal";

/*Sytle characteristics for the components used in the client script*/
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

const BotonEnviar= styled.button`
  position: absolute;
  right: 0;
  top: 90%;
  margin: 20px;
  background: #872a7b;
  color: white;
  font-size: 18px;
  padding: 10px;
  font-weight: 600;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
  width: 100px;
`;

const ClientScript = (props) => {
  /*State variables */
  const [direccion, setDireccion] = useState("");
  const [direccionGuardada, setDireccionGuardada] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [seBloquea, setBloquear] = useState(true);
  const [ajustadorBanner, setAjustadorBanner] = useState(false);
  const [servicioBanner, setServicioBanner] = useState("");
  const [ambulancia, setAmbulancia] = useState(false);
  const [grua, setGrua] = useState(false);

  /*Function to send the SMS to the client */
  const enviarSMS = async (service) => {
    await fetch("http://localhost:8080/sms/enviarMensaje", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service: service,
        direccion: direccion,
        number: props.clientPhoneNumber,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("SMS enviado");
        }
      })
      .catch((error) => {
        alert("Error al enviar SMS");
        console.log("Error al enviar SMS: " + error);
      });
  };

  /*Function to handle the address input */
  const Handler = (event) => {
    event.preventDefault();
    setDireccion(event.target.value);
    console.log(direccion);
  };

  /*Function to show the banner with the adjuster service */
  const mostrarBanner = (servicio) => {
    setServicioBanner(servicio);
    setAjustadorBanner(true);
    setTimeout(() => setAjustadorBanner(false), 5000);
  };

  /*Functions to save the address, and send the adjuster sms*/
  const guardar_direccion = async (e) => {
    e.preventDefault();
    if (direccion === "") return alert("Enter an address");
    else {
      setBloquear(false);
      setDireccionGuardada(true);
      mostrarBanner("Ajustador");
      await enviarSMS("asegurador");
      console.log(props.clientPhoneNumber);
    }
  };

  /*Function to delete the address */
  const borrar_direccion = () => {
    setDireccion("");
    setBloquear(true);
  };

  /*Functions to send the ambulance sms and show the modal*/
  const mandar_ambulancia = async () => {
    console.log("Ambulancia enviada a:" + direccion);
    await enviarSMS("ambulancia")
      .then(() => setOpenModal(true))
      .catch((error) => console.log("Error al enviar SMS: " + error));
  };

  /*Function to send the crane sms and show the modal*/
  const mandar_grua = async () => {
    console.log("Grua enviada a:" + direccion);
    await enviarSMS("grúa")
      .then(() => setOpenModal(true))
      .catch((error) => console.log("Error al enviar SMS: " + error));
  };

  const enviarSiniestro = async () => {
    await fetch("http://localhost:8080/cliente/addSiniestro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        numPoliza: props.poliza,
        direccion: direccion,
        ambulancia: ambulancia,
        grua: grua,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Siniestro enviado");
          alert("Siniestro enviado");
        }
      })
      .catch((error) => {
        alert("Error al enviar siniestro");
        console.log("Error al enviar siniestro: " + error);
      });
  };

  useEffect(() => {
    if (props.poliza) {
        console.log("Poliza: ", props.poliza);
    }
  })

  /*Return of the client script layout*/
  return (
    <Container>
      {ajustadorBanner && (
        <Banner>
          {servicioBanner} en camino a {direccion}
        </Banner>
      )}
      <BotonAyuda onClick={props.funcVentanaAyuda}>Solicitar Ayuda</BotonAyuda>
      <h1>Guión de Diálogo</h1>
      <p>
        <b>1.- Esta usted llamando al centro de atención de Qualitas</b>
      </p>
      <p>
        <b>2. ¿{props.nombre}, se encuentra usted bien?</b>
      </p>
      <p>
        <b>3. ¿En qué ubicación se encuentra?</b>
      </p>
      <Form>
        <input
          type="text"
          placeholder="Write the client's address"
          value={direccion}
          onChange={Handler}
        />
        <Boton action={guardar_direccion} txt="Save address" />
      </Form>
      <Boton action={borrar_direccion} txt="Delete address" />
      <p>
        <b>
          4. (En caso de que necesite asistencia médica) Esta llegando una
          ambulancia a su ubicación.
        </b>
      </p>
      <Boton
        action={() => {mandar_ambulancia(); setAmbulancia(true)}}
        txt="Send Ambulance"
        disabled={seBloquea}
      />
      {openModal && <Modal closeModal={setOpenModal} />}
      <p>
        <b>
          5. ¿{props.nombre}, su coche puede moverse o necesita una grúa que lo
          asista?
        </b>
      </p>
      <p>
        <b>
          6. (En caso de que no se pueda mover) Perfecto, ya va la grúa en
          camino
        </b>
      </p>
      <Boton action={() => {mandar_grua(); setGrua(true)}} txt="Send Crane" disabled={seBloquea} />
      {openModal && <Modal closeModal={setOpenModal} />}
      <p>
        <b>7. Tenga en cuenta un ajustador ya va en camino a su dirección</b>
      </p>
      <p>
        <b>
          8. Aquí me aparece que tiene registrado/s [Menciona el nombre de el o
          los vehiculos cubiertos por su poliza]. ¿En cuál vehiculo ocurrio el
          accidente?
        </b>
      </p>
      <p>
        <b>
          9. Muy bien, su poliza va a cubrir los siguientes gastos [Menciona los
          servicios que estan siendo cubiertos]
        </b>
      </p>
      <p>
        <b>
          10. ¿Hay algo más que pueda hacer por usted en este momento mientras
          espera?
        </b>
      </p>
      <BotonEnviar onClick={enviarSiniestro} disabled={!direccionGuardada}>Enviar</BotonEnviar>
    </Container>
  );
};

export default ClientScript;
