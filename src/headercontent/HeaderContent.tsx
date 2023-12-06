import Image from 'next/image';
import { useState } from 'react';
import { useToggle } from '../hooks';
import { InputBox } from '../inputbox';
import { HeaderContentProps } from '../types/headerContent';
import local from './content.module.css';
import styles from '../component.module.css';

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
};

const getDayFormat = Intl.DateTimeFormat('ko-KR', dateOptions).format;

export const HeaderContent = ({ isSearch, isLogin }: HeaderContentProps) => {
  const [currDate, setDate] = useState(getDayFormat());
  const [searchToogle, onClick] = useToggle();
  const refresh = () => {
    const newDate = getDayFormat();
    setDate(newDate);
  };
  return (
    <div className={local.header}>
      <div className={local.logo}>
        <Image src={'/images/logo.png'} alt='로고' width='30' height='24' />
        <span>DocJiB</span>
        {isLogin ? <span>세무</span> : null}
      </div>

      {isSearch ? (
        <div className={local.companySelect}>
          <div className={`${local.wrap} ${searchToogle ? local.active : ''}`}>
            <button
              type='button'
              className={local['btn-search-pop']}
              onClick={onClick}
            >
              <i className={[styles.ico, styles['ico-search']].join(' ')}></i>
            </button>
            <InputBox
              className='col-auto'
              placeholder='[1-0010] 더 좋은 이비인후과의원(등촌점) | 홍길동 | 010-0000-0000'
              isLine={false}
            />
            <ul
              className={`${local.keyword}`}
              style={{ display: searchToogle ? 'block' : 'none' }}
            >
              <li>선택 1</li>
              <li>선택 2</li>
              <li>선택 3</li>
            </ul>
          </div>
          <button type='button' className={local['btn-s1']}>
            <i className={[styles.ico, styles['ico-header-s1']].join(' ')}></i>
          </button>
        </div>
      ) : null}

      {isLogin ? (
        <div className={local.info}>
          <span className={local.profile}>
            <Image
              src='/images/profile.png'
              alt='프로필 이미지'
              width={30}
              height={30}
            />
          </span>
          <span>홍길동(관리자)</span>
          <button
            type='button'
            className={`${local['btn-refresh']}`}
            onClick={refresh}
          >
            {/* <i className={[styles.ico, styles['ico-refrech']].join(' ')}></i>{' '}
            {currDate} */}
          </button>
          <Image
            src='/images/ico-exit.png'
            alt='로그아웃'
            width={24}
            height={24}
            onClick={() => alert('logout')}
          />
        </div>
      ) : null}
    </div>
  );
};
