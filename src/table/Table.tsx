import {
  useState,
  useCallback,
  useMemo,
  ReactNode,
  createContext,
  RefObject,
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { SelectBox } from '../selectbox/SelectBox';
import { Pagination } from './Pagination';
import { ITableCxtProps, TableColumnProps } from '../types/@types.table';
import { AgGridReactProps, AgReactUiProps } from 'ag-grid-react';
import { IOption } from '../types/option';
import styles from './table.module.css';
import global from '../global.module.css';
import 'ag-grid-community/styles/ag-grid.css';
import './styles.css';

export const Tablecxt = createContext<ITableCxtProps | null>(null);

const TABLE_OPTION = [
  { value: '30', name: '30개씩 보기' },
  { value: '40', name: '40개씩 보기' },
  { value: '50', name: '50개씩 보기' },
];

interface TableProps {
  /**
   * 첫번째 행에 checkbox 생성 여부
   */
  isCheck?: boolean | number;
  /**
   * 페이징 처리 여부. true값이면 페이징 처리, false면 스크롤
   */
  isPaged?: boolean;
  /**
   * 초기 보여주는 줄의 갯수 TODO: 컴포넌트 분리에 따라 제거 여부 검토
   */
  showCount?: number;
  /**
   * 처음 mount 시 selectbox 기본 위치, n - 1번째
   */
  tableOptions?: IOption[];
  /**
   * 처음 mount 시 selectbox 기본 위치, n - 1번째
   */
  defaultPOS?: number;
  /**
   * 페이지네이션 버튼 수
   */
  pagtBtnCnt?: number;
  /**
   * 테이블 너비
   */
  height?: number | string;
  /**
   * 테이블 높이
   */
  width?: number | string;
  /**
   * tabel 안으로 전달할 column들 속성 정의
   */
  children?: ReactNode;
  /**
   * ref
   */
  tableRef?: RefObject<AgGridReact>;
  // /**
  //  * Optional click handler
  //  */
  // onClick?: () => void;
  /**
   * 원본 데이터
   */
  data?: Array<any>;
}

/**
 * Primary UI component for user interaction
 */
// TODO: 페이지네이션, 페이지 당 렌더 행 개수 변경 컴포넌트 모두 분리 여부 검토, useMemo 등 렌더 성능 최적화 적용
export const Table = ({
  isCheck = true,
  isPaged = true,
  showCount = 15,
  defaultPOS = 0,
  data = [],
  tableOptions,
  children,
  height,
  width = '100%',
  pagtBtnCnt = 5,
  tableRef,
  ...props
}: TableProps & (AgGridReactProps | AgReactUiProps)) => {
  // 페이지네이션 관련 코드 선언
  const totalDataCounts = data.length; // 총 데이터 행수
  // const tableRef = useRef<AgGridReact>(null); // ag-grid 관리
  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      option: {
        defaultColDef: { headerClass: 'centered', cellClass: 'centered' },
      },
    }),
    []
  );
  const [rowsPerPage, setRowsPerPage] = useState(
    isPaged ? showCount : totalDataCounts
  ); // 한 페이지 당 렌더할 데이터 행수 (select box로 동적 관리)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  // 전체 페이지 수
  let totalPageCounts = Math.ceil(totalDataCounts / rowsPerPage);
  if (totalPageCounts < 1) {
    totalPageCounts = 1;
  }

  const currentBlock = Math.ceil(currentPage / pagtBtnCnt); // 현재 페이지 블록 번호

  // 현재 페이지 블록의 마지막 페이지
  let lastPage = currentBlock * pagtBtnCnt;
  if (lastPage > totalPageCounts) {
    lastPage = totalPageCounts;
  }

  // 현재 페이지 블록의 첫번째 페이지
  let firstPage = lastPage - pagtBtnCnt + 1;
  if (firstPage < 1) {
    firstPage = 1;
  }

  // 페이지네이션 블럭 렌더용 배열 계산
  const getPageButtons = (startNum: number, lastNum: number): number[] =>
    Array.from({ length: lastNum - startNum + 1 }, (_, idx) => idx + startNum);

  // 페이지네이션 블럭 배열
  const pageButtons = getPageButtons(firstPage, lastPage);

  // 페이지 블록 클릭 이벤트 핸들러
  const onClickPageBtn = (page: number) => setCurrentPage(page);

  // '이전 페이지로 이동' 버튼 클릭 이벤트 핸들러
  const onClickPrevPageBtn = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  // '다음 페이지로 이동' 버튼 클릭 이벤트 핸들러
  const onClickNextPageBtn = () => {
    const newPageNum = currentPage + 1;
    if (newPageNum <= totalPageCounts) setCurrentPage(newPageNum);

    if (newPageNum > lastPage) {
      const newLastPage = newPageNum + pagtBtnCnt;
      getPageButtons(newPageNum, newLastPage);
    }
  };

  // '마지막 페이지로 이동' 버튼 클릭 이벤트 핸들러
  const onClickLastPageBtn = () => setCurrentPage(totalPageCounts);

  // 한 페이지 당 렌더 데이터 행 개수 변경 이벤트 핸들러
  const onChangeRowsPerPage = (selected: string) => {
    setRowsPerPage(Number(selected));
    setCurrentPage(1);
  };

  // context API
  const [column, setColumn] = useState<TableColumnProps[]>([]);
  const addColumnProps = useCallback(
    (props: TableColumnProps) =>
      setColumn((prev) =>
        prev.find((ele) => ele.field === props.field) ? prev : [...prev, props]
      ),
    []
  );

  const columnDefs = useMemo(() => {
    const temp = [...column];
    console.log(temp)
    temp.sort((a, b) => (a.order || 999) - (b.order || 999));
    return isCheck
      ? typeof isCheck === 'boolean'
        ? [
            {
              headerCheckboxSelection: true,
              checkboxSelection: true,
              width: 50,
            },
            ...temp,
          ]
        : [
            ...temp.slice(0, isCheck),
            {
              headerCheckboxSelection: true,
              checkboxSelection: true,
              width: 50,
            },
            ...temp.slice(isCheck),
          ]
      : temp;
  }, [column]);

  const getRowStyle = (params: any) => {
    if (params.data.status === 'REQUESTED') {
      return { backgroundColor: 'yellow' };
    }
    return undefined;
  };

  return (
    <Tablecxt.Provider value={{ column, addColumnProps }}>
      <div className='tblWrap'>
        <div
          className={[global['d-flex'], global['align-items-center']].join(' ')}
        >
          {children}
          {isPaged ? (
            <div className={global['ml-auto']}>
              <SelectBox
                isMultiple={false}
                option={tableOptions ?? TABLE_OPTION}
                defaultPOS={defaultPOS}
                width='12rem'
                onChange={onChangeRowsPerPage}
              />
            </div>
          ) : null}
        </div>
        <div
          className={[styles['table-body-wrap'], global['mt-1']].join(' ')}
          style={{
            width,
            height: isPaged ? '100%' : height ? height : '',
          }}
        >
          {/*{ console.log(data) }*/}
          <div className='ag-theme-alpine' style={{ height: '100%' }}>
            <AgGridReact
              ref={tableRef}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowData={
                isPaged
                  ? data.slice(
                      (currentPage - 1) * rowsPerPage,
                      currentPage * rowsPerPage
                    )
                  : data
              }
              suppressMovableColumns={true}
              getRowStyle={getRowStyle}
              rowSelection='multiple'
              suppressRowClickSelection={true}
              domLayout={isPaged || !height ? 'autoHeight' : 'normal'}
              overlayNoRowsTemplate={
                '<strong style="font-size:24px">데이터가 없습니다.</strong>'
              }
              rowClassRules={{
                'hidden-row': (params) => params?.data?.status === 'A',
              }}
              {...props}
            />
          </div>
        </div>
        {isPaged ? (
          <Pagination
            pageButtons={pageButtons}
            currentPage={currentPage}
            onClickPageBtn={onClickPageBtn}
            onClickPrevPageBtn={onClickPrevPageBtn}
            onClickNextPageBtn={onClickNextPageBtn}
            onClickLastPageBtn={onClickLastPageBtn}
          />
        ) : null}
      </div>
    </Tablecxt.Provider>
  );
};
