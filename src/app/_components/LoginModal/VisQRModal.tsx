"use client";
import { Modal } from "@navikt/ds-react";
import loginmodalStyles from "./loginmodal.module.css";

interface Props {
  åpen: boolean;
  lukk: () => void;
  title: string;
  children: React.ReactNode;
}

export const VisQRModal = ({ åpen, lukk, title, children }: Props) => {
  return (
    <Modal
      open={åpen}
      onClose={lukk}
      header={{ heading: title }}
      closeOnBackdropClick={true}
      width="50rem"
    >
      <Modal.Body className={loginmodalStyles.qrKodeModal}>
        {children}
      </Modal.Body>
    </Modal>
  );
};
