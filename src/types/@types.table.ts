import { ColDef, ColGroupDef } from 'ag-grid-community';

export type TableColumnProps =
  | (ColDef | ColGroupDef) & { order?: number; field: string };

export type ITableCxtProps = {
  column: TableColumnProps[];
  addColumnProps: (props: TableColumnProps) => void;
};
