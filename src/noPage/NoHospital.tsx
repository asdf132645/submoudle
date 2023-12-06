import Image from 'next/image';
import AidImage from '../images/ico-doctor.png';
import styles from './index.module.css';

export const NoHospital = () => {
  return (
    <div className={styles.notpage}>
      <div className={styles['hospital-mark']}>
        <Image src={AidImage} alt='aid-image' width={30} height={27.5} />
      </div>
      <div className={styles.description}>
        <p>
          업무를 진행하기 위해 <br /> 병원을 선택해 주세요!
        </p>
      </div>
    </div>
  );
};
