// import './popup.css';
import { useToggle } from '../hooks/useToggle';
import { Button, ButtonProps } from '../button/Button';
import { Modal } from './Modal';
import { useMemo } from 'react';

export interface PopupProps {
  /**
   * 버튼 속성 입력(Popup Component내에서 버튼 생성)
   */
  btnProp?: ButtonProps[];
  /**
   *  내용
   */
  children?: React.ReactNode;
  /**
   * 팝업에 제목이 있는가
   */
  label?: string;
  /**
   * 팝업에 x버튼이 있는지 여부
   */
  isXBtn?: boolean;
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Popup = ({
  btnProp,
  children,
  isXBtn = true,
  label,
}: PopupProps) => {
  const [hidden, setToggle] = useToggle();

  const btnCtl = useMemo(
    () => Array.from({ length: btnProp?.length || 0 }, () => setToggle),
    []
  );

  return (
    <div className='col'>
      <Button
        label='팝업'
        types='solid'
        style='qua'
        size='lg'
        onClick={setToggle}
      />
      <Modal
        button={
          <>
            {btnProp && btnProp.length > 0 ? (
              btnProp.map((props, idx) => (
                <Button key={idx} {...props} onClick={btnCtl[idx]} />
              ))
            ) : (
              <></>
            )}
          </>
        }
        label={label}
        isXBtn={isXBtn}
        hidden={hidden}
        setToggle={setToggle}
      >
        {children}
      </Modal>
    </div>
  );
};
