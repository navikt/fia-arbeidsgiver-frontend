import { Modal, VStack } from "@navikt/ds-react";
import komponenterStyles from "./komponenter.module.css";

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
    >
      <Modal.Body className={komponenterStyles.qrKodeModal}>
        <VStack align={"center"} justify={"center"}>
          {children}
        </VStack>
      </Modal.Body>
    </Modal>
  );
};
