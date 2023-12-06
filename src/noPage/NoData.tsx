import { Button } from '../button';
import Image from 'next/image';
import textImage from '../images/ico-textdd.png';
import styles from './index.module.css';

export const NoData = () => {
  return (
    <div className={styles.notpage}>
      <div className={styles['default-mark']}>
        <Image src={textImage} alt='txt-image' width={22.5} height={30} />
      </div>
      <div className={styles.description}>
        <p>검색 결과가 없습니다.</p>
        검색조건을 확인 후 다시 검색해 주세요.
      </div>
      <Button
        margin='2rem 1rem 0 0'
        size='vlg'
        style='ter'
        className='col-100'
        padding='1rem'
        label='초기화'
      />
    </div>
  );
};
