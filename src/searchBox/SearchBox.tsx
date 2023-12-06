import { lazy, Suspense, useState } from 'react';
import { OPTION_LIST } from '../mock';
import { SearchConditionProps } from '../types/@types.searchCondition';
import { InputBox } from '..';
import { IOption } from '../types/option';
import { InputProps } from '../inputbox/InputBox';
import local from './searchbox.module.css';
import styles from '../component.module.css';

const SelectBox = lazy(() =>
  import('../selectbox/SelectBox').then(({ SelectBox }) => ({
    default: SelectBox,
  }))
);

interface SearchProps extends InputProps {
  /**
   * 검색 옵션 설정 select box 사용 여부
   */
  isSelect?: boolean;
  /**
   * 검색 옵션 설정 select box 사용 시 옵션 목록
   */
  option?: IOption[];
  /**
   * 검색 이벤트 핸들러
   */
  onSearch?: (conditions: SearchConditionProps) => void;
}

/**
 * Primary UI component for user interaction
 */
export const SearchBox = ({
  isSelect = false,
  option = OPTION_LIST,
  onSearch,
  ...props
}: SearchProps) => {
  // const [selected, selector] = useState<string>('');
  const [keyword, setKeyword] = useState(''); // 입력된 검색어

  // 엔터키 입력 이벤트 핸들러
  const onKeyUpEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onExecuteSearch();
  };

  // 검색 이벤트 실행 핸들러
  const onExecuteSearch = () => {
    if (!keyword) return false;

    onSearch &&
      onSearch({
        keyword: keyword.trim(),
        // TODO: 검색 옵션 설정 select box 사용 시 선택된 옵션값 추가
      });
  };

  return (
    <div className={local.searchWrap}>
      {isSelect ? (
        <Suspense fallback={<div>...</div>}>
          {<SelectBox label='' option={option} width='14rem' />}
        </Suspense>
      ) : null}
      <InputBox
        className='col-100'
        placeholder='검색어를 입력하세요.'
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={onKeyUpEnter}
        {...props}
      />
      <button
        type='button'
        className={styles['btn-search']}
        title='검색버튼'
        onClick={onExecuteSearch}
      >
        <i className={[styles.ico, styles['ico-search']].join(' ')}></i>
      </button>
    </div>
  );
};
