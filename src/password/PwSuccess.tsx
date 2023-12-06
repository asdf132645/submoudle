interface PwSuccessProps {
  reset: () => void;
}

export default function PwSuccess({ reset }: PwSuccessProps) {
  return (
    <form>
      <div className='passwordWrap'>
        <div className='tit'>
          <i className='ico ico-check'></i>
        </div>
        <h4 className='mt-2'>비밀번호가 안전하게 변경되었습니다.</h4>
        <div className='frmbtnWrap mt-4'>
          <button
            type='button'
            className='btn btn-solid col-100 sy3-5'
            onClick={() => reset()}
          >
            확인
          </button>
        </div>
      </div>
    </form>
  );
}
