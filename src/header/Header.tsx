import { HeaderProps } from '../types/header';
import styles from './header.module.css';

export const Header = ({ toggle, onToggle, HeaderContents }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.companySelect}>
        <button
          type='button'
          className={`${styles['btn-lnb-view-toggle']} ${
            toggle ? styles.active : ''
          }`}
          onClick={onToggle}
        >
          <i className={styles['ico-lnb-toggle']}></i>
        </button>
      </div>
      {HeaderContents}
    </header>
  );
};
