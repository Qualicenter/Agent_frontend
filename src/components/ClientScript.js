import styled from "styled-components";
import { useState} from "react";
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
  const [seBloquea, setBloquear] = useState(true);
  const [ajustadorBanner, setAjustadorBanner] = useState(false);
  const [servicioBanner, setServicioBanner] = useState("");

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

  const Handler = (event) => {
    event.preventDefault();
    setDireccion(event.target.value);
    console.log(direccion);
  };

  const mostrarBanner = (servicio) => {
    setServicioBanner(servicio);
    setAjustadorBanner(true);
    setTimeout(() => setAjustadorBanner(false), 5000);
  };

  const guardar_direccion = async (e) => {
    e.preventDefault();
    if (direccion === "") return alert("Ingresa una dirección");
    else {
      setBloquear(false);
      mostrarBanner("Ajustador");
      await enviarSMS("asegurador");
      console.log(props.clientPhoneNumber);
    }
  };

  const borrar_direccion = () => {
    setDireccion("");
    setBloquear(true);
  };

  const mandar_ambulancia = async () => {
    console.log("Ambulancia enviada a:" + direccion);
    await enviarSMS("ambulancia")
      .then(() => setOpenModal(true))
      .catch((error) => console.log("Error al enviar SMS: " + error));
  };

  const mandar_grua = async () => {
    console.log("Grua enviada a:" + direccion);
    await enviarSMS("grúa")
      .then(() => setOpenModal(true))
      .catch((error) => console.log("Error al enviar SMS: " + error));
  };

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
          placeholder="Escribe la dirección del cliente"
          value={direccion}
          onChange={Handler}
        />
        <Boton action={guardar_direccion} txt="Guardar dirección" />
      </Form>
      <Boton action={borrar_direccion} txt="Borrar dirección" />
      <p>
        <b>
          4. (En caso de que necesite asistencia médica) Esta llegando una
          ambulancia a su ubicación.
        </b>
      </p>
      <Boton
        action={mandar_ambulancia}
        txt="Enviar Ambulancia"
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
      <Boton action={mandar_grua} txt="Enviar Grúa" disabled={seBloquea} />
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
    </Container>
  );
};

export default ClientScript;
