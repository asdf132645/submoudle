import { Modal, ModalProps } from './Modal';

/**
 * 단순 확인 모달 창
 */
export const Confirm = ({ hidden, button, children }: ModalProps) => (
  <Modal hidden={hidden} button={button}>
    {children}
  </Modal>
);
