import { useRef } from 'react';

interface PwChangeProps {
  nextPage: () => void;
}

export default function PwChange({ nextPage }: PwChangeProps) {
  const newPwRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  return (
    <form>
      <div className='passwordWrap'>
        <div>
          <h4>비밀번호 재설정</h4>
          <p className='mt-1'>회원님의 비밀번호를 다시 설정해 주세요.</p>
          <div className='col mt-3'>
            <label className='label' htmlFor='newPW'>
              새로운 비밀번호
            </label>
            <input
              type='password'
              ref={newPwRef}
              className='frm-input col-100'
              placeholder='새로운 비밀번호를 입력해 주세요.'
              id='newPW'
            />
          </div>
          <div className='col mt-1'>
            <label className='label' htmlFor='cfmPW'>
              비밀번호 확인
            </label>
            <input
              type='password'
              ref={confirmRef}
              className='frm-input col-100'
              placeholder='비밀번호를 한번 더 입력해 주세요.'
              id='cfmPW'
            />
          </div>
        </div>
        <div className='frmbtnWrap mt-4'>
          <button
            type='button'
            className='btn btn-solid col-100 sy3-5'
            onClick={() => {
              newPwRef.current?.value === confirmRef.current?.value
                ? confirm('정말 변경하시겠습니까') && nextPage()
                : alert('확인 비밀번호가 다릅니다.');
            }}
          >
            변경하기
          </button>
        </div>
      </div>
    </form>
  );
}
