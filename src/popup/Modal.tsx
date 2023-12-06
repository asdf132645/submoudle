import { PopupProps } from './Popup';
import styles from '../component.module.css';
import global from '../global.module.css';

export interface ModalProps extends PopupProps {
  hidden: boolean;
  setToggle?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  button?: JSX.Element;
}

export const Modal = ({
  isXBtn = false,
  label,
  hidden,
  button,
  setToggle,
  children,
}: ModalProps) => {
  return (
    <div className={styles.modal} style={{ display: hidden ? '' : 'none' }}>
      <div className={styles['modal-wrap']}>
        <div
          className={[
            styles['modal-container'],
            label ? styles.headerType : '',
            label ? global['modal-550'] : global['modal-300'],
          ].join(' ')}
        >
          {label ? (
            <div className={styles['modal-header']}>
              <h3>{label}</h3>
              {isXBtn ? (
                <button
                  type='button'
                  className={styles['pop-close']}
                  onClick={setToggle}
                ></button>
              ) : null}
            </div>
          ) : isXBtn ? (
            <button
              className={[global['pop-close'], styles['pop-close-black']].join(
                ' '
              )}
              onClick={setToggle}
            />
          ) : null}

          <div className={styles['modal-body']}>{children}</div>
          <div className={styles['modal-footer']}>{button}</div>
        </div>
      </div>
    </div>
  );
};
