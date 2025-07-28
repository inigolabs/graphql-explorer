import styles from "./ListChart.module.css";

import classNames from "classnames";

import { ListChartProps } from "./ListChart.types";
import DashboardWidgetChartEmpty from "../Dashboard/components/Empty/Empty";
import { DashboardWidgetPropsChartType } from "../Dashboard/components/Widget/Widget.types";
import List, { IListColumn } from "../List/List";
import { useCallback, useMemo } from "react";
import { ListChartColumnType } from "../ListChart/ListChart.types";
import { DataSourceResult, ListColumnAlignContent } from "../List/List.types";

const ListChart = (props: ListChartProps) => {
  const listColumns = useMemo((): IListColumn[] => {
    const hasPrimaryColumn = props.columns.some((column) => column.primary);

    return props.columns.map((column, i) => ({
      title: column.label,
      dataPath: column.dataKey,
      minWidth: column.minWidth,
      maxWidth: column.maxWidth,
      primary: hasPrimaryColumn ? column.primary : i === 0,
      sortingEnabled: true,
      alignContent:
        column.type === ListChartColumnType.Number
          ? ListColumnAlignContent.Right
          : ListColumnAlignContent.Left,
      renderContent: (
        listColumn: IListColumn,
        dataItem: Record<string, any>,
        index: number,
        hovered: boolean
      ) => {
        const value = dataItem[listColumn.dataPath];

        if (column.render) {
          return column.render(value, dataItem, hovered);
        }

        return value;
      },
    }));
  }, [props.columns]);

  const listDataSource = useCallback(
    (
      page: number,
      pageSize: number,
      sortColumn: string,
      sortColumnDir: "asc" | "desc",
      search?: string
    ): Promise<DataSourceResult> => {
      return new Promise((resolve) => {
        if (!props.data) {
          resolve({
            total: 0,
            data: [],
          });
        }

        const start = page * pageSize;
        const end = start + pageSize;

        let total = props.data.length;

        let data = [...props.data].sort((a: any, b: any): any => {
          const propA = a[sortColumn] as any;
          const propB = b[sortColumn] as any;

          if (typeof propA === "string" && typeof propB === "string") {
            return sortColumnDir === "desc"
              ? propB.localeCompare(propA)
              : propA.localeCompare(propB);
          } else {
            return sortColumnDir === "desc" ? propB - propA : propA - propB;
          }
        });

        if (search) {
          data = data.filter((item) => {
            return item.name.toLowerCase().includes(search.toLowerCase());
          });
        }

        data = data.slice(start, end);

        setTimeout(() => {
          resolve({
            total,
            data,
          });
        });
      });
    },
    [props.data]
  );

  return (
    <div
      className={classNames(
        styles.container,
        props.className,
        (!props.data || !props.data.length) && styles.empty
      )}
    >
      <List
        className={classNames(
          styles.list,
          (!props.data || !props.data.length) && styles.empty
        )}
        embedded
        columns={listColumns}
        data={listDataSource}
        defaultSortColumn={`${props.defaultSortColumn}_${
          props.defaultSortDirection ?? "desc"
        }`}
        onRowClick={props.onRowClick}
      />
      <div className={styles.mock}>
        {(!props.data || !props.data.length) && (
          <DashboardWidgetChartEmpty
            type={DashboardWidgetPropsChartType.List}
          />
        )}
      </div>
    </div>
  );
};

export default ListChart;
export * from "./ListChart.types";
