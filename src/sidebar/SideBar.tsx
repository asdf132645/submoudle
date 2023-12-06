import Link from 'next/link';
import { useRouter } from 'next/router';
import { SidebarProps } from '../types/sidebar';
import styles from './sidebar.module.css';

const defaultBtns: [number, string][] = [
  [1, 'btn-home'],
  [2, 'btn-alarm'],
  [3, 'btn-user'],
];

export const SideBar = ({
  SideBarContents,
  toggle,
  btnRoutes,
  alarmCheck,
  alarmNoti,
}: SidebarProps) => {
  const { asPath } = useRouter();

  return (
    <>
      <div className={`${styles.lnbWrap} ${toggle ? styles.active : ''}`}>
        <div className={styles['lnb-bar']}>
          <ul>
            {defaultBtns.map(([id, style], idx) =>
              id !== 2 ? (
                <li key={id}>
                  <Link href={btnRoutes[idx]}>
                    <button
                      type='button'
                      className={[
                        styles[style],
                        btnRoutes[idx] === asPath ? styles.active : '',
                      ].join(' ')}
                    >
                      {id === 2 && alarmCheck ? <span></span> : null}
                    </button>
                  </Link>
                </li>
              ) : (
                <li key={id}>
                  {/*<Link href={btnRoutes[idx]}>*/}
                  <button
                    type='button'
                    className={[
                      styles[style],
                      btnRoutes[idx] === asPath ? styles.active : '',
                    ].join(' ')}
                    onClick={() => {
                      if (alarmNoti) {
                        alarmNoti && alarmNoti();
                      }
                    }}
                  >
                    {id === 2 && alarmCheck ? <span></span> : null}
                  </button>
                  {/*</Link>*/}
                </li>
              )
            )}
          </ul>
        </div>
        {SideBarContents}
      </div>
    </>
  );
};
