import { useContext, useEffect } from 'react';
import { ITableCxtProps, TableColumnProps } from '../types/@types.table';
import { Tablecxt } from './Table';

export const TableColumn = (props: TableColumnProps) => {
  const { addColumnProps } = useContext(Tablecxt) as ITableCxtProps;
  useEffect(() => addColumnProps(props), []);
  return <></>;
};
