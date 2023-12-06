import { useFetch, useInput } from '../hooks';
import { Button, InputBox } from '../index';
import { LabelAbove } from '../label';
import { SelectBox } from '../selectbox';
import styles from './search.module.css';
import global from '../global.module.css';

const siOption = [
  { value: '서울', name: '서울' },
  { value: '인천', name: '인천' },
  { value: '경기', name: '경기' },
];

const guOption = [
  { value: '금천구', name: '금천구' },
  { value: '동작구', name: '동작구' },
  { value: '강북구', name: '강북구' },
];

interface IAddr {
  id: number;
  newAddr: string;
  oldAddr: string;
}

interface AddrSearchProps {
  /**
   * 선택 상자의 높이
   */
  height?: number;
}

export const AddrSearch = ({ height = 21 }: AddrSearchProps) => {
  const addrList: IAddr[] = useFetch('http://localhost:3003/addr');
  const [keyword, onChange] = useInput('');

  return (
    <>
      <form>
        <div className={styles.addrWrap}>
          <div style={{ display: 'flex' }}>
            <div className={global['col-50']}>
              <SelectBox label='시/도 선택' option={siOption} />
            </div>
            <div className={global['col-50']}>
              <SelectBox label='시/군/구 선택' option={guOption} />
            </div>
          </div>
          <div className={global['mt-1']}>
            <InputBox className='col-100' label='주소' onChange={onChange} />
            <LabelAbove label='예&#40; 대진빌딩, 서초 자이아파트, 서초동 1557-16 ...' />
          </div>
          <Button
            label='검색'
            types='solid'
            style='ter'
            size='lg'
            className='col-100'
          />
        </div>
      </form>

      <form style={{ display: 'block', marginTop: '3rem' }}>
        <h4>주소를 클릭하면 자동으로 입력됩니다.</h4>
        <ul className={styles.addrList} style={{ height: `${height}rem` }}>
          {addrList
            .filter(
              ({ newAddr, oldAddr }: IAddr) =>
                newAddr.includes(keyword) || oldAddr.includes(keyword)
            )
            .map((addr: IAddr) => (
              <li key={addr.id}>
                <dl className='data1'>
                  <dt>도로명</dt>
                  <dd>{addr.newAddr}</dd>
                </dl>
                <dl className='data2'>
                  <dt>지번</dt>
                  <dd>{addr.oldAddr}</dd>
                </dl>
              </li>
            ))}
        </ul>
        <table className={[styles['tbl-list'], styles.noline].join(' ')}>
          <caption>테이블</caption>
          <colgroup>
            <col width='90' />
            <col width='' />
          </colgroup>
          <tbody>
            <tr>
              <th>기본주소</th>
              <td>
                서울 서초구 서초중앙로 24길 4 (서초동, 국민은행서초동지점)
              </td>
            </tr>
            <tr>
              <th>상세주소</th>
              <td>
                <InputBox
                  placeholder='상세주소를 입력하세요.'
                  className='col-100'
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
};
