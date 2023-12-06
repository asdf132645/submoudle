import { SelectBox } from '@/index';
import { OPTION_LIST } from '../data/option';

export const TableTest = ({ children }: { children: JSX.Element }) => {
  return (
    <table>
      <tbody>
        <tr>{children}</tr>
      </tbody>
    </table>
  );
};

export const FormField = ({
  label,
  children,
}: {
  label: string;
  children: JSX.Element;
}) => {
  return (
    <>
      <td>{label}</td>
      <td>{children}</td>
    </>
  );
};

export const HR = () => {
  return { __html: `</tr><tr>` };
};

export const ExTable = ({ type }: { type: string }) => {
  return (
    <TableTest>
      <>
        <FormField label='이름'>
          <SelectBox option={OPTION_LIST} name='테스트1' />
        </FormField>
        {/* <HR /> */}
        {/* <Fragment dangerouslySetInnerHTML={{ __html: `</tr><tr>` }} /> */}

        <FormField label='나이'>
          <SelectBox option={OPTION_LIST} name='테스트2' />
        </FormField>
      </>
    </TableTest>
  );
};
