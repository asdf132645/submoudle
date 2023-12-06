import { Button } from '..';
import { Modal, ModalProps } from './Modal';

/**
 * 단순 경고 알림 창: children으로 content 전달
 */
export const Alert = ({ hidden, setToggle, children }: ModalProps) => (
  <Modal
    hidden={hidden}
    isXBtn={true}
    setToggle={setToggle}
    button={
      <Button
        label='확인'
        types='solid'
        style='ter'
        size='lg'
        onClick={setToggle}
        className={'col-100'}
      />
    }
  >
    {children}
  </Modal>
);
