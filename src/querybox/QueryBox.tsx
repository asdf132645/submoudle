import {
  forwardRef,
  useReducer,
  useRef,
  useEffect,
  KeyboardEvent,
} from 'react';
import {
  dateDefOptions,
  dateInfer,
  defaultOptions,
  dentDefOptions,
  initState,
  QueryBoxProps,
  queryReducer,
} from '.';
import { Button, InputBox } from '..';
import { DateBox } from '../dateBox';

import styles from '../component.module.css';

import global from '../global.module.css';

export const QueryBox = forwardRef<HTMLFormElement, QueryBoxProps>(
  function QueryBox(
    {
      option = defaultOptions,
      selectOptions = dentDefOptions,
      onClick,
      onReset,
      defaultYear,
    },
    ref
  ) {
    /** 현재 키값, 필터 상태, 토글을 관리하는 reducer */
    const [{ currentKey, selectState, toggle, date, query }, dispatch] =
      useReducer(queryReducer, initState);
    /** 현재 선택된 키값이 속한 옵션 */
    const currentOption = option.find((op) => op.value === currentKey);
    /** 날짜 선택시 날짜 관련 dropdown을 표시할 지 여부의 derived state */
    const isDateState = selectState === 'date' || selectState === 'dateTerm';
    const isMonthState = selectState === 'month' || selectState === 'monthTerm';

    /** input을 관리하는 ref */
    const inputRef = useRef<HTMLInputElement>(null);

    /** filter dropdown으로부터 key를 전달 받는 메서드 */
    const onFilterChange = (payload: string) => {
      dispatch({ type: 'KEY', payload });
      dispatch({
        type: 'SELECT_STATE',
        payload: option.find(({ value }) => value === payload)?.type || 'input',
      });
      dispatch({ type: 'TOGGLE' });
    };

    /** 필터 추가 버튼 클릭시 작동할 메서드 */
    const filterSelect = () => {
      if (selectState === 'default') {
        dispatch({ type: 'TOGGLE' });
      } else {
        dispatch({ type: 'SELECT_STATE' });
        dispatch({ type: 'DATE' });
        dispatch({ type: 'TOGGLE', payload: false });
      }
    };

    /** 날짜 선택박스 클릭시 적용할 메서드 */
    const onDateSelect = (input: string) => {
      if (input === '') return;
      if (input === 'select')
        return dispatch({
          type: 'SELECT_STATE',
          payload: 'datePicker',
        });

      const inferredDate = dateInfer(input, selectState);
      dispatch({ type: 'QUERY_ADD', payload: [currentKey, inferredDate] });
    };

    /** 날짜 창에서 날짜 변화시 즉시 변화 */
    const onDateChange = (payload: string) =>
      dispatch({ type: 'DATE', payload });

    /** 날짜 선택 후 [적용]버튼 클릭시 실행할 메서드 */
    const onTermChange = () =>
      dispatch({ type: 'QUERY_ADD', payload: [currentKey, date] });

    /** 선택박스 클릭시 실행할 메서드 */
    const onSelectChange = (input: string) =>
      input && dispatch({ type: 'QUERY_ADD', payload: [currentKey, input] });

    /** 인풋일 경우 enter시 필터에 내용추가 */
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
        // 일부 브라우저에서의 submit 방지
        e.preventDefault();
        /** 현재 inputbox의 값을 임시로 저장할 변수 */
        const tempValue = inputRef?.current?.value || '';
        dispatch({ type: 'QUERY_ADD', payload: [currentKey, tempValue] });
      }
    };

    /** 삭제버튼 클릭시 해당 필터 제거 */
    const onDelete = (payload: string) =>
      dispatch({ type: 'QUERY_REMOVE', payload });

    /** query box 내외부 초기화 */
    const allReset = () => {
      dispatch({ type: 'RESET' });
      onReset && onReset();
    };

    /** onClick시 값 전달 */
    const onSearchButtonClick = () => {
      if (!inputRef.current?.value || selectState !== 'input') return;

      const tempValue = inputRef?.current?.value || '';
      dispatch({ type: 'QUERY_ADD', payload: [currentKey, tempValue] });

      onClick && onClick();
    };

    useEffect(() => {
      selectState === 'default' && onClick && onClick();
    }, [selectState, query.length]);

    useEffect(() => {
      if (defaultYear === 'year') {
        dispatch({
          type: 'QUERY_ADD',
          payload: ['year', String(new Date().getFullYear())],
        });
        onClick && onClick();
      }
    }, []);

    return (
      <div className='searchWrap filter'>
        <form ref={ref} onSubmit={(e) => e.preventDefault()}>
          <table className='tbl-list filter'>
            <caption>테이블</caption>
            <colgroup>
              <col width='' />
            </colgroup>
            <thead>
              <tr>
                <td>
                  <div
                    className={[
                      global['d-flex'],
                      global['align-items-center'],
                    ].join(' ')}
                  >
                    <div className={styles['filter-ui']}>
                      <button
                        type='button'
                        className={styles['btn-filter']}
                        onClick={filterSelect}
                      >
                        {selectState === 'default'
                          ? '필터추가'
                          : currentOption?.name ?? '필터추가'}
                        <i className='ico ico-plus-gray ml-auto'></i>
                      </button>
                      {selectState === 'default' && toggle ? (
                        <ul className={styles['filter-option']}>
                          {option.map(({ value, name }) => (
                            <li
                              key={name}
                              value={value}
                              onClick={() => onFilterChange(value)}
                            >
                              {name}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {isDateState || isMonthState ? (
                        <ul className={styles['filter-option']}>
                          {dateDefOptions.map(({ value, name }) => (
                            <li
                              key={name}
                              value={value}
                              onClick={() => onDateSelect(value)}
                            >
                              {name}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {selectState === 'select' && selectOptions[currentKey] ? (
                        <ul className={styles['filter-option']}>
                          {selectOptions[currentKey].map(({ value, name }) => (
                            <li
                              key={name}
                              value={value}
                              onClick={() => onSelectChange(value)}
                            >
                              {name}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                    <div className={[global['pl-1'], global['pr-1']].join(' ')}>
                      {selectState === 'input' ? (
                        <InputBox
                          ref={inputRef}
                          type='text'
                          className='col-100'
                          onKeyDown={onKeyDown}
                        />
                      ) : null}
                      {selectState === 'datePicker' ? (
                        <DateBox
                          types={
                            currentOption?.type?.slice(0, 4) === 'date'
                              ? 'day'
                              : 'month'
                          }
                          isTerm={currentOption?.type?.slice(-4) === 'Term'}
                          date={date}
                          setDate={onDateChange}
                          onClick={onTermChange}
                        />
                      ) : null}
                    </div>
                    <div
                      className={`${global['ml-auto']} ${global['mr-1']} ${global['d-flex']} ${global['align-items-center']}`}
                    >
                      <Button
                        types='solid'
                        style='ter'
                        size='md'
                        label='검색'
                        onClick={onSearchButtonClick}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </thead>
          </table>
          <div className={styles.tagWrap}>
            <ul className={styles['tag-list']}>
              {query.map(([key, value]) => (
                <li key={key}>
                  <input hidden name={key} value={value} readOnly />
                  {option.find((op) => op.value === key)?.name}: {value}
                  <button onClick={() => onDelete(key)}>
                    <i className='ico ico-delete-tag'></i>
                  </button>
                </li>
              ))}
            </ul>
            <button
              type='button'
              className={`${styles['btn-reset']} ${global['ml-auto']}`}
              onClick={allReset}
            >
              <i className='ico ico-reset mr-05'></i>초기화
            </button>
          </div>
        </form>
      </div>
    );
  }
);
