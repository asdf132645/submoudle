import { useToggle } from '../hooks/useToggle';
import { NoticeContent } from '../types/@types.notice';
import styles from './notice.module.css';

export default function NoticeBar({ notice }: { notice: NoticeContent }) {
  const { title, createAt, content } = notice;
  const [toggle, onToggle] = useToggle();
  return (
    <>
      <li className={toggle ? 'bg' : ''}>
        <div className='col-auto'>
          <p
            className={[styles.subject, toggle ? styles.active : ''].join(' ')}
          >
            {title} <i className={styles['ico-new']}>N</i>
          </p>
          <p className={styles.info}>{createAt}</p>
        </div>
        <button
          type='button'
          className={[
            styles['btn-toggle-notice'],
            'ml-auto',
            toggle ? styles.active : '',
          ].join(' ')}
          onClick={onToggle}
        ></button>
      </li>
      <li className={[styles.comment, toggle ? styles.active : ''].join(' ')}>
        {content}
      </li>
    </>
  );
}
