import { forwardRef, useRef, useState } from 'react';
import { Button, SelectBox } from '@/index';
import { OPTION_LIST } from '../data/option';
import styles from './css/selectform.module.css';

interface SelectFormProps {
  type: 'primary';
}

export const SelectFormPage = forwardRef<HTMLFormElement, SelectFormProps>(
  ({ type }, ref) => {
    // formData를 담고 있는 위치
    const formRef = useRef<HTMLFormElement | null>(null);

    /** 단일 선택 박스 state로 관리
     * [주의사항] option으로 넣을 배열을 함수 내부에서 선언시 state로 관리 불가
     * 사용하면 안되는 방식 예.
     * export const ComponentFunction = () => {
     *    const [value, setValue] = useState('')
     *    const onChange = (input: string) => setValue(input);
     *    const optionList = [
     *       {value: '1', name: '1'},
     *       {value: '2', name: '2'},
     *       {value: '3', name: '3'},
     *    ]
     *    // state 변경 시 rerendering이 일어나 optionList의 주소가 바뀌어
     *    // 현재 선택박스에서는 state 관리가 안된다.
     *    return (<div>
     *     <SelectBox
     *      option={optionList}
     *      onChange={onChange}
     *    </div>)
     * }
     *
     * 의도한 방식
     * // 함수 외부에서 선언하여 rerendering 방지
     * const optionList = [
     *       {value: '1', name: '1'},
     *       {value: '2', name: '2'},
     *       {value: '3', name: '3'},
     * ];
     * export const ComponentFunction = () => {
     *    const [value, setValue] = useState('')
     *    const onChange = (input: string) => setValue(input);
     *    // state 변경 시 rerendering이 일어나도 optionList가 그대로이다.
     *    return (<div>
     *     <SelectBox
     *      option={optionList}
     *      onChange={onChange}
     *    </div>)
     * }
     *
     * 다른 예
     * export const ComponentFunction = () => {
     *    const [value, setValue] = useState('')
     *    const onChange = (input: string) => setValue(input);
     *    const optionList = useMemo(()=>[
     *       {value: '1', name: '1'},
     *       {value: '2', name: '2'},
     *       {value: '3', name: '3'},
     *    ],[]);
     *    // state 변경 시 rerendering이 일어나도 optionList가 그대로이다.
     *    return (<div>
     *     <SelectBox
     *      option={optionList}
     *      onChange={onChange}
     *    </div>)
     * }
     */
    const [singleBox, setSingle] = useState('');
    const onChange = (input: string) => setSingle(input);

    /** 단일, 다중 선택박스 formData로 가져오기
     * 현재 페이지의 다중 선택박스는 신규 퍼블리싱 오는대로 deprecate
     */
    const [multiBox, setMultiBox] = useState<FormDataEntryValue[]>([]);
    const getFormData = () => {
      const form = new FormData(
        formRef?.current ? formRef?.current : undefined
      );

      setMultiBox(
        ['두번째', '세번째', '네번째'].reduce(
          (result: FormDataEntryValue[], formName) => [
            ...result,
            ...form.getAll(formName),
          ],
          []
        )
      );
    };

    return (
      <form ref={formRef}>
        <table
          className={styles['select-table']}
          style={{ textAlign: 'center' }}
        >
          <tbody>
            <tr>
              <th colSpan={3}>state로 관리되는 단일 박스의 값:</th>
              <td colSpan={3}>{singleBox}</td>
            </tr>
            <tr>
              <th>dd</th>
              <td colSpan={5}>
                <SelectBox
                  option={OPTION_LIST}
                  onChange={onChange}
                  name='첫번째'
                />
              </td>
            </tr>
            <tr>
              <th colSpan={3}>formData 다중 박스의 값(확인 클릭):</th>
              <td colSpan={3}>{multiBox.join(',')}</td>
            </tr>
            <tr>
              <th>이름</th>
              <td>
                <SelectBox
                  option={OPTION_LIST}
                  name='두번째'
                  isMultiple={true}
                  width='15rem'
                />
              </td>
              <th>제목</th>
              <td>
                <SelectBox option={OPTION_LIST} name='세번째' />
              </td>
              <th>조건</th>
              <td>
                <SelectBox option={OPTION_LIST} name='네번째' />
              </td>
            </tr>
            <tr>
              <td colSpan={6}>
                <>
                  <Button
                    label='확인'
                    style='pri'
                    size='md'
                    onClick={getFormData}
                  />
                  <Button
                    label='취소'
                    style='pri'
                    size='md'
                    onClick={() => {
                      setSingle('');
                      setMultiBox([]);
                    }}
                  />
                </>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
);

SelectFormPage.displayName = 'SelectForm';
