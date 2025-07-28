import React from 'react';
import * as api from '../../utils/api';
import { SortColumn } from './List';
import { IDataTableProps } from '@containers/Authorized/components/DataTable/DataTable';

export type ListDataItem = Record<string, unknown>;
export type ListData = ListDataItem[];

export interface IListRef {
  getData: () => ListData;
  reload: () => void;
}

export enum ListColumnAlignContent {
  None = 'None',
  Left = 'Left',
  Center = 'Center',
  Right = 'Right',
}

export interface IListColumn {
  title: string;
  dataPath: string;
  primary?: boolean;
  description?: string;
  span?: number;
  cellStyle?: React.CSSProperties;
  maxWidth?: number;
  minWidth?: number;
  fixed?: {
    enabled: boolean;
  };
  alignContent?: ListColumnAlignContent;
  sortingEnabled?: boolean;
  sortingKey?: string;
  sort?: (x: unknown, y: unknown, dir: string) => number;
  hover?: boolean;
  className?: string;
  renderContent?: (
    column: IListColumn,
    dataItem: ListDataItem,
    index: number,
    hovered: boolean,
    data?: ListData,
    search?: string,
  ) => React.ReactNode;
}

export enum DataSourceDir {
  First = 'first',
  Next = 'next',
  Prev = 'prev',
  Last = 'last',
}

export interface DataSourceOptions {
  currentPage: number;
  pageSize: number;
  pageInfo?: api.PageInfo;
  sortColumn: SortColumn;
  direction?: DataSourceDir;
}

export interface DataSourceResult {
  total: number;
  pageInfo?: api.PageInfo;
  data: ListData;
}

export interface IListProps {
  className?: string;
  userPreferencesId?: string;
  columns: IListColumn[];
  embedded?: boolean;
  data?:
    | ListData
    | ((
        page: number,
        pageSize: number,
        sortColumn: string,
        sortColumnDir: api.QueryDataSortDirection,
        search?: string,
      ) => Promise<DataSourceResult>);
  async?: IDataTableProps['async'];
  emptyText?: React.ReactNode;
  title?: string;
  loading?: boolean;
  dataSource?: {
    document: string;
    dataPath?: string;
    select?: (data: any) => any;
    variables?: Record<string, any>;
  };
  asyncDataSource?: {
    document: string;
    dataPath?: string;
    select?: (data: any) => any;
    variables?: Record<string, any>;
  };
  defaultSortColumn?: string;
  itemsPerPage?: number;
  actions?: IListAction[];
  search?: boolean;
  headerSuffix?: React.ReactNode;
  stickyHeader?: boolean;
  onDataLoaded?: (data: DataSourceResult) => void;
  onRowClick?: (dataItem: ListDataItem, index: number) => void;
  renderEmpty?: () => React.ReactNode;
  pageSizeOptions?: number[];
  create?: {
    label: string;
    handler: () => void;
  };
  resizeEnabled?: boolean;
  isRowFocused?: (dataItem: ListDataItem) => boolean;
}

export interface IListAction {
  label: string;
  icon?: JSX.Element | string;
  callback?: (dataItem: ListDataItem, index: number) => void;
  href?: (dataItem: ListDataItem, index: number) => string;
  shouldRender?: (dataItem: ListDataItem, index: number) => boolean;
  children?: IListAction[];
}
