import { useState } from 'react';
import { SearchConditionProps } from '../types/@types.searchCondition';
import { useFetch } from '../hooks/useFetch';
import { SearchBox } from '../searchBox/SearchBox';
import { Table } from '../table/Table';
import { TableColumn } from '../table/TableColumn';
import global from '../global.module.css';

interface IFirm {
  id: number;
  isChecked: boolean;
  ENTPNumber: string;
  ENTPName: string;
  Owner: string;
  ENTPType: string;
}

interface FirmSearchProps {
  /**
   * 선택 상자의 높이
   */
  height?: number;
}

export const FirmSearch = ({ height = 25 }: FirmSearchProps) => {
  const firmList: IFirm[] = useFetch('http://localhost:3003/firm');
  const [keyword, setKeyword] = useState('');
  const onSearch = ({ keyword }: SearchConditionProps) => {
    setKeyword(keyword);
  };
  return (
    <>
      <form>
        <div className='searchWrap'>
          <SearchBox onSearch={onSearch} />
        </div>
      </form>
      <form className={global['mt-2']}>
        <h4>기업검색</h4>
        <div
          className={global['overflow-y']}
          style={{ height: `${height}rem` }}
        >
          <Table
            data={firmList.filter(
              (firm) =>
                firm.ENTPName.includes(keyword) || firm.Owner.includes(keyword)
            )}
            isPaged={false}
            width=''
          >
            <TableColumn
              field='ENTPNumber'
              order={1}
              headerName='사업자번호'
              flex={2}
            />
            <TableColumn
              field='ENTPName'
              order={2}
              headerName='명칭'
              flex={2}
            />
            <TableColumn
              field='Owner'
              order={3}
              headerName='대표자명'
              flex={1}
            />
            <TableColumn
              field='ENTPType'
              order={4}
              headerName='업종'
              flex={2}
            />
          </Table>
        </div>
      </form>
    </>
  );
};
