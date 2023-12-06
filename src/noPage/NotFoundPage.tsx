import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button } from '../button';
import ComputerImage from '../images/ico-computer.png';
import styles from './index.module.css';

export const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className={styles.notpage}>
      <div className={styles['default-mark']}>
        <Image src={ComputerImage} alt='not-found' width={30} height={27.5} />
      </div>
      <div className={styles.description}>
        <p>요청한 페이지를 찾을 수 없습니다!</p>
        <div className='mt-1'>
          존재하지 않는 주소를 입력하셨거나, <br />
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다. <br />
          입력하신 주소가 정확한지 다시 한 번 확인해 주시기 바랍니다.
        </div>
      </div>
      <div className={styles['btn-container']}>
        <Button
          margin='0 1rem 0 0'
          size='vlg'
          style='ter'
          className='col-100'
          padding='1rem'
          label='이전 페이지로 돌아가기'
          onClick={router.back}
        />
        <Button
          types='solid'
          className='col-100'
          style='ter'
          size='vlg'
          padding='1rem'
          label='메인으로 돌아가기'
          onClick={() => router.push('/')}
        />
      </div>
    </div>
  );
};
