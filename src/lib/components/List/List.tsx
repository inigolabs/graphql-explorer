import "./List.scss";

import jp from "jsonpath";
import get from "lodash/get";
import { forwardRef, useMemo } from "react";

import {
  DataTable,
  DataTableData,
  DataTableDataResponse,
  DataTableDataRow,
  IDataTableAction,
  IDataTableProps,
} from "../DataTable/DataTable";
import { fetcher } from "../../utils/fetcher";

import {
  IListColumn,
  IListProps,
  IListRef,
  ListColumnAlignContent,
  ListData,
  ListDataItem,
} from "./List.types";

export * from "./List.types";

const DEFAULT_PAGE_SIZE_OPTIONS = [25, 50, 100];

export type SortColumn = {
  column: IListColumn;
  dir: "asc" | "desc";
} | null;

type IRenderCell = {
  column: IListColumn;
  data: ListData;
  dataItem: ListDataItem;
  i: number;
  handleHoverRow: (rowIndex: IRowIndex) => void;
  handleClickRow: (rowIndex: IRowIndex) => void;
  hoveredRow: IRowIndex;
  search?: string;
};

type IRowIndex = number | null;

export const renderStringWithSearch = (
  value: string,
  searchValue?: string | RegExp | ((str: string) => boolean)
) => {
  if (!searchValue) {
    return value;
  }

  if (searchValue instanceof Function) {
    return searchValue(value) ? (
      <span className="SearchValue">{value}</span>
    ) : (
      value
    );
  }

  if (searchValue instanceof RegExp) {
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: value.replace(
            searchValue,
            (match) => `<span class="SearchValue">${match}</span>`
          ),
        }}
      ></span>
    );
  }

  const index = value.toLowerCase().indexOf(searchValue.toLowerCase());

  if (index === -1) {
    return value;
  }

  return (
    <span>
      {value.slice(0, index)}
      <span className="SearchValue">
        {value.slice(index, index + searchValue.length)}
      </span>
      {value.slice(index + searchValue.length)}
    </span>
  );
};

const List = forwardRef<IListRef, IListProps>((props, ref) => {
  const columns = useMemo(
    () =>
      props.columns.map((column) => {
        let alignContent: IDataTableProps["columns"][number]["alignContent"];

        if (column.alignContent === ListColumnAlignContent.Left) {
          alignContent = "left";
        }

        if (column.alignContent === ListColumnAlignContent.Center) {
          alignContent = "center";
        }

        if (column.alignContent === ListColumnAlignContent.Right) {
          alignContent = "right";
        }

        return {
          title: column.title,
          dataPath: column.dataPath,
          sortKey: column.sortingKey,
          sortEnabled: column.sortingEnabled,
          minWidth: column.minWidth,
          alignContent,
          description: column.description,
          renderContent: column.renderContent
            ? (value, dataItem, options) => {
                return column.renderContent!(
                  column,
                  dataItem,
                  0,
                  !!options.hover,
                  options.data,
                  options.search
                );
              }
            : undefined,
        };
      }) satisfies IDataTableProps["columns"],
    [props.columns]
  );

  const data = useMemo((): IDataTableProps["data"] => {
    if (props.dataSource) {
      return async (
        pageNumber: number,
        pageSize: number,
        sortColumn: string,
        sortDirection: "asc" | "desc",
        search?: string,
        abortController?: AbortController,
        skipAsync?: boolean
      ): Promise<DataTableDataResponse> => {
        if (!skipAsync && props.asyncDataSource) {
          let data: any = await fetcher(
            props.asyncDataSource!.document,
            {
              ...props.asyncDataSource!.variables,
              page: {
                limit: pageSize,
                offset: pageNumber * pageSize,
              },
              sort: {
                field: sortColumn,
                direction: sortDirection,
              },
              includeAsync: skipAsync,
            },
            {},
            abortController
          )();

          if (props.asyncDataSource!.select) {
            data = props.asyncDataSource!.select(data);
          } else if (props.asyncDataSource!.dataPath) {
            if (props.asyncDataSource!.dataPath.startsWith("$")) {
              data = jp.query(data, props.asyncDataSource!.dataPath);
            } else {
              data = get(data, props.asyncDataSource!.dataPath);
            }
          }

          return {
            total: data.totalCount,
            data: (data.edges ?? []).map((edge: any) => edge.node),
          };
        } else {
          let data: any = await fetcher(
            props.dataSource!.document,
            {
              ...props.dataSource!.variables,
              page: {
                limit: pageSize,
                offset: pageNumber * pageSize,
              },
              sort: {
                field: sortColumn,
                direction: sortDirection,
              },
              includeAsync: skipAsync,
            },
            {},
            abortController
          )();

          if (props.dataSource!.select) {
            data = props.dataSource!.select(data);
          } else if (props.dataSource!.dataPath) {
            if (props.dataSource!.dataPath.startsWith("$")) {
              data = jp.query(data, props.dataSource!.dataPath);
            } else {
              data = get(data, props.dataSource!.dataPath);
            }
          }

          return {
            total: data.totalCount,
            data: (data.edges ?? []).map((edge: any) => edge.node),
          };
        }
      };
    }

    if (typeof props.data === "function") {
      return async (
        pageNumber: number,
        pageSize: number,
        sortColumn: string,
        sortDirection: "asc" | "desc",
        search?: string,
        abortController?: AbortController
      ): Promise<DataTableDataResponse> => {
        if (typeof props.data === "function") {
          const result = await props.data!(
            pageNumber,
            pageSize,
            sortColumn,
            sortDirection,
            search
          );

          if (result) {
            return {
              total: result.total,
              data: result.data,
            };
          }

          return {
            total: 0,
            data: [],
          };
        }

        return {
          total: 0,
          data: [],
        };
      };
    }

    return props.data as DataTableData;
  }, [props.data, props.dataSource, props.asyncDataSource]);

  const actions = useMemo(() => {
    return props.actions?.map(function handleAction(action): IDataTableAction {
      return {
        title: action.label,
        icon: action.icon,
        callback: action.callback
          ? (dataItem: DataTableDataRow) => action.callback!(dataItem, 0)
          : undefined,
        href: action.href
          ? (dataItem: DataTableDataRow) => action.href!(dataItem, 0)
          : undefined,
        shouldRender: action.shouldRender
          ? (dataItem: DataTableDataRow) => action.shouldRender!(dataItem, 0)
          : undefined,
        children: action.children
          ? action.children.map(handleAction)
          : undefined,
      };
    });
  }, [props.actions]);

  return (
    <DataTable
      key={JSON.stringify(props.dataSource)}
      className={props.className}
      id={props.userPreferencesId}
      columns={columns}
      data={data}
      async={props.async}
      actions={actions}
      title={props.title}
      create={props.create}
      loading={props.loading}
      defaultSortColumn={props.defaultSortColumn?.split("_")[0]}
      defaultSortDirection={
        (props.defaultSortColumn?.split("_")[1] ?? "desc") as "asc" | "desc"
      }
      stickyHeader={props.stickyHeader}
      pageSizeOptions={props.pageSizeOptions}
      embedded={props.embedded}
      search={props.search}
      headerSuffix={props.headerSuffix}
      onDataLoaded={props.onDataLoaded}
      resizeEnabled={props.resizeEnabled}
      onRowClick={props.onRowClick}
      isRowFocused={props.isRowFocused}
    />
  );
});

export default List;
