import { useRef } from 'react';

interface PwConfirmProps {
  nextPage: () => void;
}

export default function PwConfirm({ nextPage }: PwConfirmProps) {
  const currPwRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  return (
    <form>
      <div className='passwordWrap'>
        <div>
          <p>
            정보를 안전하게 보호하기 위해
            <br />
            비밀번호를 다시 한번 입력해 주세요.
          </p>
          <div className='col mt-3'>
            <input
              type='text'
              ref={currPwRef}
              className='frm-input col-100 readonly'
            />
          </div>
          <div className='col mt-1'>
            <input
              type='password'
              ref={confirmRef}
              className='frm-input col-100'
            />
          </div>
        </div>
        <div className='frmbtnWrap mt-4'>
          <button
            type='button'
            className='btn btn-solid col-100 sy3-5'
            onClick={() =>
              currPwRef.current?.value === confirmRef.current?.value
                ? nextPage()
                : alert('비밀번호가 일치하지 않습니다')
            }
          >
            확인
          </button>
        </div>
      </div>
    </form>
  );
}
