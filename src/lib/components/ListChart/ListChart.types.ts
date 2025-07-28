export enum ListChartColumnType {
  Text = 'text',
  Number = 'number',
}

export interface ListChartColumn {
  label: string;
  dataKey: string;
  primary?: boolean;
  minWidth?: number;
  maxWidth?: number;
  type?: ListChartColumnType;
  render?: (value: any, dataItem: Record<string, any>, hovered: boolean) => React.ReactNode;
}

export interface ListChartProps {
  className?: string;
  defaultSortColumn: string;
  defaultSortDirection?: 'asc' | 'desc';
  columns: ListChartColumn[];
  data: Record<string, any>[];
  onRowClick?: (dataItem: Record<string, any>) => void;
}
