import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface IModalProps {
  children: JSX.Element;
  title: string;
  hasFooter?: boolean;
  size?: "sm" | "lg" | "xl";
  handleAccept?: () => void;
  handleClose: () => void;
}

const ellipsis: React.CSSProperties = {
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

export default function ModalComponent(props: IModalProps) {
  const { children, title, size, hasFooter, handleAccept, handleClose } = props;
  const [sendingInfo, setSendingInfo] = useState(false);

  const handleOnclick = () => {
    setSendingInfo(true);
    handleAccept && handleAccept();
    setSendingInfo(false);
  };

  return (
    <Modal
      show={true}
      backdrop="static"
      keyboard={false}
      onHide={handleClose}
      size={size}
    >
      <Modal.Header closeButton>
        <Modal.Title className="mx-2" style={ellipsis}>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="m-0 p-0">{children}</Modal.Body>
      {!hasFooter && (
        <Modal.Footer className="px-1 mx-2">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="btn btn-inverse-primary rounded fw-bold mx-2"
          >
            Cancelar
          </Button>
          {sendingInfo ? (
            <button
              className="btn btn-inverse-primary rounded px-5"
              type="button"
              disabled
            >
              <span
                className="spinner-border spinner-border-sm "
                role="status"
                aria-hidden="true"
              ></span>
              <span className="sr-only"></span>
            </button>
          ) : (
            handleAccept != undefined && (
              <Button
                variant="primary"
                onClick={handleOnclick}
                className="btn btn-inverse-primary rounded fw-bold"
              >
                Aceptar
              </Button>
            )
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
}
