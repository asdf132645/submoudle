import Link from 'next/link';
import { useRouter } from 'next/router';

const subtabs: [number, string, string][] = [
  [1, '/user', '파트너 기본 정보'],
  [2, '/user/other', '추가정보 입력'],
  [3, '/user/change', '비밀번호 변경'],
  [4, '/user/invite', '담당자 초대'],
];

export const SubabWrap = () => {
  const router = useRouter();
  return (
    <div className='subabWrap'>
      <ul className='subTab'>
        {subtabs.map(([id, route, label]) => (
          <li key={id} className={router.pathname === route ? 'active' : ''}>
            <Link href={route}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
