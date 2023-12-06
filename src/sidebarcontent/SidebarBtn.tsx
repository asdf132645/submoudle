import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './sidebarbtn.module.css';

interface SidebarBtnProps {
  style: string;
  label: string;
  linkUrl: string;
  /** idx기준으로 화면 펼치기 */
  isActive?: boolean;
  /** 버튼으로 전달할 on:click 메소드 */
  onClick?: () => void;
  subMenuList: { name: string; idx: number; urlLink: string }[];
}

export const SideBarBtn = ({
  style,
  label,
  linkUrl,
  isActive,
  onClick,
  subMenuList = [],
}: SidebarBtnProps) => {
  const router = useRouter();

  return (
    <li>
      <Link
        href={`${
          linkUrl || subMenuList[0]?.urlLink || ''
        }?${new URLSearchParams(Object(router.query))}`}
      >
        <button
          type='button'
          className={[
            styles.btn,
            styles[style],
            isActive ? styles.active : '',
            style === 'btn-lnb-normal' && router.route === linkUrl
              ? styles.current
              : '',
          ].join(' ')}
          onClick={onClick}
        >
          {label}
        </button>
      </Link>
      {Array.isArray(subMenuList) && isActive && subMenuList.length > 0 ? (
        <ul className={styles['lnb-depth2']}>
          {Array.isArray(subMenuList) &&
            subMenuList.map(({ idx, name, urlLink }) => (
              <Link
                key={idx}
                href={`${urlLink}?${new URLSearchParams(Object(router.query))}`}
              >
                <li>
                  <button
                    type='button'
                    className={[
                      styles['btn-link'],
                      router.route === urlLink ? styles.active : '',
                    ].join(' ')}
                  >
                    {name}
                  </button>
                </li>
              </Link>
            ))}
        </ul>
      ) : null}
    </li>
  );
};
