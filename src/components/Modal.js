/**
 * @author Abigail Donají Chávez Rubio
 * Component that creates a modal to notify that the sms has been sent
 * @param {function} closeModal - function to open/close the modal
*/

import "../styles/modal.css";

const Modal = ({ closeModal }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titulo">
          <p>Mensaje Enviado</p>
        </div>
        <button className="boton" onClick={() => closeModal(false)}>OK</button>
      </div>
    </div>
  );
};

export default Modal;
