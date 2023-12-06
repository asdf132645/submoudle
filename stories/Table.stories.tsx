import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table } from '@/table';
import { TableColumn } from '@/table';
import { Button } from '@/index';
import { TableColumnProps } from '@/types/@types.table';
import { Checkbox } from './CheckBox.stories';

export default {
  title: 'Components/Table',
  component: Table,
  loaders: [
    async () => ({
      data: await fetch('http://localhost:3003/table').then((res: Response) =>
        res.json()
      ),
    }),
  ],
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args, { loaded: { data } }) => (
  <Table {...{ data, ...args }} />
);

const initOptions: TableColumnProps[] = [
  { field: 'id', headerName: '키값', order: 1, flex: 1 },
  { field: 'title', headerName: '내용', order: 2, flex: 1 },
  { field: 'content', headerName: '내용2', order: 3, flex: 1 },
  { field: 'content2', headerName: '내용3', order: 4, flex: 1 },
];

export const Check = Template.bind({});

Check.args = {
  defaultPOS: 1,
  children: (
    <>
      <Button types='excel' />
      <Button types='delete' margin='0 0 0 1rem' />
      {initOptions.map((option, idx) => (
        <TableColumn key={idx} {...option} />
      ))}
    </>
  ),
};

export const NotCheck = Template.bind({});
NotCheck.args = {
  isCheck: false,
  showCount: 5,
  children: (
    <>
      <div className='d-flex align-items-center col-100'>
        <Button types='excel' />
        <Button types='delete' margin='0 0 0 1rem' />
        <div
          style={{ display: 'flex', marginLeft: 'auto', marginRight: '1rem' }}
        >
          <Checkbox type='RADIO' label='청구건수' />
          <Checkbox type='RADIO' label='가격' />
        </div>
      </div>
      {initOptions.map((option, idx) => (
        <TableColumn key={idx} {...option} />
      ))}
    </>
  ),
};

export const InjectTableOption = Template.bind({});
InjectTableOption.args = {
  isCheck: false,
  tableOptions: [
    { value: '10', name: '10개씩 보기' },
    { value: '20', name: '20개씩 보기' },
    { value: '30', name: '30개씩 보기' },
  ],
  children: (
    <>
      <div className='d-flex align-items-center col-100'>
        <Button types='excel' />
        <Button types='delete' margin='0 0 0 1rem' />
        <div
          style={{ display: 'flex', marginLeft: 'auto', marginRight: '1rem' }}
        >
          <Checkbox type='RADIO' label='청구건수' />
          <Checkbox type='RADIO' label='가격' />
        </div>
      </div>
      {initOptions.map((option, idx) => (
        <TableColumn key={idx} {...option} />
      ))}
    </>
  ),
};

export const NotPage = Template.bind({});
NotPage.args = {
  isPaged: false,
  children: (
    <>
      <Button types='excel' />
      <Button types='delete' margin='0 0 0 1rem' />
      <div style={{ display: 'flex', marginLeft: 'auto' }}>
        <Checkbox type='RADIO' label='청구건수' />
      </div>
      {initOptions.map((option, idx) => (
        <TableColumn key={idx} {...option} />
      ))}
    </>
  ),
};
