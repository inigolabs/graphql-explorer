import classNames from "classnames";
import { debounce, get } from "lodash";
import moment from "moment";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";

import Checkbox from "../Checkbox/Checkbox";
import Error from "../Error/Error";
import Icon, {
  AddCircle,
  ArrowDropDown,
  ArrowDropUp,
  ArrowLeft,
  ArrowRight,
  DragHandle,
  GoToFirst,
  GoToLast,
  IconInfo,
  IconRight,
  IconSearch,
  More,
} from "../Icon/Icon";
import { renderStringWithSearch } from "../List/List";
import Loader from "../Loader/Loader";
import Menu, { Option as MenuOption } from "../Menu/Menu";
import Select, { Option as SelectOption } from "../Select/Select";
import TextInput from "../TextInput/TextInput";
import Tooltip from "../Tooltip/Tooltip";
import Button, { ButtonSize, ButtonVariant } from "../Buttons/Button";
import { renderBigNumber } from "../../utils/helpers";
import { updateQueryParamByName } from "../../utils/queryParams";

import styles from "./DataTable.module.css";
import localPreferences from "../../utils/localPreferences";

const DEFAULT_PAGE_SIZE_OPTIONS = [25, 50, 100];

export interface IDataTableRef {}

interface IDataTableColumn {
  title: string;
  renderTitle?: (title: string) => React.ReactNode;
  description?: React.ReactNode;
  draggable?: boolean;
  dataPath: string;
  minWidth?: number;
  maxWidth?: number;
  sortKey?: string;
  skipAsync?: boolean;
  asyncData?: DataTableData;
  asyncLoading?: boolean;
  onRowClick?: (dataRow: DataTableDataRow, index: number) => void;
  resizeEnabled?: boolean;
  sortEnabled?: boolean;
  alignContent?: "left" | "center" | "right";
  renderContent?: (
    value: any,
    dataRow: DataTableDataRow,
    options: { search?: string; hover?: boolean; data: DataTableData }
  ) => React.ReactNode;
}

export type DataTableDataRow = Record<string, any>;
export type DataTableData = DataTableDataRow[];

export type DataTableDataResponse = {
  total: number;
  data: DataTableData;
};

export type DataTableDataFunction = (
  pageNumber: number,
  pageSize: number,
  sortColumn: string,
  sortDirection: "asc" | "desc",
  search?: string,
  abortController?: AbortController,
  skipAsync?: boolean
) => Promise<DataTableDataResponse>;

export interface IDataTableAction {
  title: string;
  icon?: React.ReactNode;
  callback?: (dataRow: DataTableDataRow) => void;
  href?: (dataRow: DataTableDataRow) => string;
  shouldRender?: (dataRow: DataTableDataRow) => boolean;
  children?: IDataTableAction[];
}

export interface IDataTableBulkAction {
  title: string;
  icon?: React.ReactNode;
  callback?: (dataRow: DataTableDataRow[], clear: () => void) => void;
  href?: (dataRow: DataTableDataRow[]) => string;
  shouldRender?: (dataRow: DataTableDataRow[]) => boolean;
}

export interface IDataTableProps {
  id?: string;
  className?: string;
  columns: IDataTableColumn[];
  actions?: IDataTableAction[];
  title?: string;
  bulkActions?: IDataTableBulkAction[];
  data: DataTableData | DataTableDataFunction;
  async?: {
    columns: string[];
    data: (
      pageNumber: number,
      pageSize: number,
      sortColumn: string,
      sortDirection: "asc" | "desc",
      search?: string,
      abortController?: AbortController
    ) => Promise<DataTableData>;
  }[];
  defaultSortColumn?: string;
  defaultSortDirection?: "asc" | "desc";
  stickyHeader?: boolean;
  resizeEnabled?: boolean;
  pageSizeOptions?: number[];
  search?: boolean;
  embedded?: boolean;
  headerSuffix?: React.ReactNode;
  onDataLoaded?: (data: DataTableDataResponse) => void;
  emptyText?: React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  loading?: boolean;
  innerScroll?: boolean;
  onRowClick?: (dataRow: DataTableDataRow, index: number) => void;
  selection?: "single" | "multiple";
  disallowSelection?: (dataRow: DataTableDataRow) => boolean;
  onSelectionChange?: (selected: DataTableDataRow[]) => void;
  create?: {
    label: string;
    handler: () => void;
  };
  isRowFocused?: (dataRow: DataTableDataRow) => boolean;
}

interface IDataTableColumnProps extends IDataTableColumn {
  data: DataTableData;
  width: number;
  isResizing: boolean;
  isDragging: boolean;
  isLoading?: boolean;
  onDragStart: (
    columnDataPath: string,
    clientX: number,
    clientY: number
  ) => void;
  onResizeStart: (columnDataPath: string) => void;
  onResizeDoubleClick: (columnDataPath: string) => void;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (columnDataPath: string, sortDirection: "asc" | "desc") => void;
  search?: string;
  hoveredRowIndex?: number | null;
  isRowFocused?: (dataRow: DataTableDataRow) => boolean;
  onMouseOver?: (index: number) => void;
  onMouseLeave?: (index: number) => void;
}

interface IDataTableHeadProps extends IDataTableColumnProps {}

interface IDataTableBodyProps extends IDataTableColumnProps {}

const DataTableHead = (props: IDataTableHeadProps) => {
  const onDragMouseDown = useCallback(
    (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (props.isDragging) {
        return;
      }

      ev.stopPropagation();
      ev.preventDefault();

      props.onDragStart(props.dataPath, ev.clientX, ev.clientY);
    },
    [props.onDragStart, props.dataPath, props.isDragging]
  );

  const onResizeMouseDown = useCallback(
    (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      ev.stopPropagation();
      ev.preventDefault();

      props.onResizeStart(props.dataPath);
    },
    [props.onResizeStart, props.dataPath]
  );

  const onResizeDoubleClick = useCallback(() => {
    props.onResizeDoubleClick(props.dataPath);
  }, [props.onResizeDoubleClick, props.dataPath]);

  const onSort = useCallback(() => {
    // if (total && total > 50000000) {
    //   message({
    //     type: MessageType.Error,
    //     text: 'Selected a data set is too big to sort. Please use a shorter time window, or apply filters and grouping.',
    //     duration: 20000,
    //   });
    //   return;
    // }

    if (
      !(props.sortKey || props.sortEnabled) ||
      !props.onSort ||
      props.isDragging ||
      props.isResizing
    ) {
      return;
    }

    if (props.sortKey || props.sortEnabled) {
      if ((props.sortKey ?? props.dataPath) === props.sortColumn) {
        if (props.sortDirection === "desc") {
          return props.onSort?.(props.sortKey ?? props.dataPath, "asc");
        }
        if (props.sortDirection === "asc") {
          return props.onSort?.(props.sortKey ?? props.dataPath, "desc");
        }
      }

      return props.onSort?.(props.sortKey ?? props.dataPath, "desc");
    }
  }, [
    props.dataPath,
    props.sortColumn,
    props.sortDirection,
    props.sortKey,
    props.sortEnabled,
    props.onSort,
    props.isDragging,
    props.isResizing,
  ]);

  return (
    <div
      className={classNames(
        styles.head,
        !!(props.sortKey || props.sortEnabled) && styles.sortable,
        props.sortColumn === (props.sortKey ?? props.dataPath) && styles.sorted,
        !!props.description && styles.description,
        props.draggable !== false && styles.draggable
      )}
    >
      <div
        className={classNames(
          styles.content,
          styles[props.alignContent ?? "left"]
        )}
        onClick={onSort}
      >
        <div className={styles.title}>
          {props.renderTitle ? (
            props.renderTitle(props.title)
          ) : (
            <Tooltip
              text={props.title}
              style={{ maxWidth: "100%" }}
              popupStyle={{ padding: "var(--gutter-extra-small)" }}
              truncated
            >
              {props.title}
            </Tooltip>
          )}
        </div>
        {!!props.description && (
          <div className={styles.description}>
            <Tooltip
              renderContent={() => props.description}
              popupStyle={
                typeof props.description === "string"
                  ? { padding: "var(--gutter-extra-small)" }
                  : { maxWidth: "max-content" }
              }
              targetStyle={{ width: "auto" }}
            >
              <Icon icon={<IconInfo />} size={16} />
            </Tooltip>
          </div>
        )}
        {(props.sortKey || props.sortEnabled) &&
          props.sortColumn === (props.sortKey ?? props.dataPath) && (
            <div className={styles.sort}>
              <Icon
                icon={
                  props.sortDirection === "asc" ? (
                    <ArrowDropUp />
                  ) : (
                    <ArrowDropDown />
                  )
                }
                size={24}
              />
            </div>
          )}
        {props.draggable !== false && (
          <div className={styles.drag}>
            <div
              className={styles.button}
              onMouseDown={onDragMouseDown}
              onClick={(ev) => ev.stopPropagation()}
            >
              <Icon icon={<DragHandle />} size={16} />
            </div>
          </div>
        )}
      </div>
      {props.resizeEnabled !== false && (
        <div
          className={styles.resize}
          onMouseDown={onResizeMouseDown}
          onClick={(ev) => ev.stopPropagation()}
          onDoubleClick={onResizeDoubleClick}
        />
      )}
    </div>
  );
};

const DataTableBodyCell = (
  props: IDataTableBodyProps & { dataRow: DataTableDataRow; i: number }
) => {
  const isHovered = useMemo(
    () => props.hoveredRowIndex === props.i,
    [props.hoveredRowIndex, props.i]
  );
  const isFocused = useMemo(
    () => props.isRowFocused?.(props.dataRow) ?? false,
    [props.dataRow, props.isRowFocused]
  );

  const value = useMemo(() => {
    let result: any = null;
    let row: DataTableDataRow = props.dataRow;

    if (props.isLoading) {
      result = <div className={styles.placeholder} />;
    } else if (props.asyncLoading) {
      result = <div className={styles.placeholder} />;
    } else if (props.asyncData?.length && !props.skipAsync) {
      row = props.asyncData[props.i];

      result = get(row, props.dataPath);

      if (props.renderContent) {
        result = props.renderContent(result, row, {
          search: props.search,
          hover: isHovered || isFocused,
          data: props.data,
        });
      }

      if (props.search && typeof result === "string") {
        result = renderStringWithSearch(result, props.search);
      }
    } else {
      result = get(row, props.dataPath);

      if (props.renderContent) {
        result = props.renderContent(result, row, {
          search: props.search,
          hover: isHovered || isFocused,
          data: props.data,
        });
      }

      if (props.search && typeof result === "string") {
        result = renderStringWithSearch(result, props.search);
      }
    }

    if (typeof result === "object") {
      return result;
    }

    return (
      <Tooltip
        text={result}
        style={{ maxWidth: "100%" }}
        popupStyle={{ padding: "var(--gutter-extra-small)" }}
        truncated
      >
        {result}
      </Tooltip>
    );
  }, [
    props.dataRow,
    props.dataPath,
    props.i,
    props.isLoading,
    props.asyncLoading,
    props.asyncData,
    props.search,
    props.renderContent,
    props.hoveredRowIndex,
    isHovered,
  ]);

  return (
    <div
      className={classNames(
        styles.cell,
        (props.hoveredRowIndex === props.i || isFocused) && styles.hovered,
        props.onRowClick && styles.clickable
      )}
      onMouseEnter={() => props.onMouseOver?.(props.i)}
      onMouseLeave={() => props.onMouseLeave?.(props.i)}
      onClick={() => props.onRowClick?.(props.dataRow, props.i)}
    >
      <div
        className={classNames(
          styles.content,
          styles[props.alignContent ?? "left"]
        )}
      >
        {typeof value === "object" ? (
          value
        ) : (
          <Tooltip
            text={value}
            style={{ maxWidth: "100%" }}
            popupStyle={{ padding: "var(--gutter-extra-small)" }}
            truncated
          >
            {value}
          </Tooltip>
        )}
      </div>
    </div>
  );
};

const DataTableBody = (props: IDataTableBodyProps) => {
  return (
    <div className={styles.body}>
      {props.data.map((dataRow, i) => (
        <DataTableBodyCell key={i} {...props} dataRow={dataRow} i={i} />
      ))}
    </div>
  );
};

const DataTableColumn = (props: IDataTableColumnProps) => {
  return (
    <div
      className={classNames(styles.column, props.isDragging && styles.drag)}
      data-data-path={props.dataPath}
    >
      <DataTableHead {...props} />
      {!!props.data.length && <DataTableBody {...props} />}
    </div>
  );
};

const DEFAULT_MIN_WIDTH = 140;
const EMBEDDED_MIN_WIDTH = 60;
const DEFAULT_MAX_WIDTH = "1fr";

export const DataTable = forwardRef<IDataTableRef, IDataTableProps>(
  (props, ref) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const mainContainerRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const fixedRef = useRef<HTMLDivElement>(null);
    const fixedLeftRef = useRef<HTMLDivElement>(null);
    const fixedHeaderRef = useRef<HTMLDivElement>(null);

    const pageSizeOptions = props.pageSizeOptions ?? DEFAULT_PAGE_SIZE_OPTIONS;

    const [search, _setSearch] = useState("");
    const setSearch = useMemo(() => debounce(_setSearch, 300), []);
    const [page, setPage] = useState(0);
    const [pageSize, _setPageSize] = useState(pageSizeOptions[0]);

    const setPageSize = useCallback(
      (pageSize: number) => {
        _setPageSize(pageSize);
        setPage(0);
      },
      [_setPageSize]
    );

    const defaultSortColumn = useMemo(() => {
      const searchParams = new URLSearchParams(window.location.search);

      const sortColumn = searchParams.get("sort_field");

      if (
        sortColumn &&
        props.columns.some((column) => column.sortKey === sortColumn)
      ) {
        return sortColumn;
      }

      updateQueryParamByName(
        "sort_field",
        props.defaultSortColumn ?? "",
        "replace"
      );
      updateQueryParamByName(
        "sort_direction",
        props.defaultSortDirection ?? "desc",
        "replace"
      );

      return props.defaultSortColumn ?? "";
    }, []);

    const defaultSortDirection = useMemo(() => {
      const searchParams = new URLSearchParams(window.location.search);

      const sortDirection = searchParams.get("sort_direction");

      if (sortDirection && ["asc", "desc"].includes(sortDirection as any)) {
        return sortDirection as "asc" | "desc";
      }

      return props.defaultSortDirection ?? "desc";
    }, []);

    const [sortColumn, _setSortColumn] = useState<string>(defaultSortColumn);
    const [sortDirection, _setSortDirection] = useState<"asc" | "desc">(
      defaultSortDirection
    );

    const setSortColumn = useCallback((sortColumn: string) => {
      _setSortColumn(sortColumn);

      updateQueryParamByName("sort_field", sortColumn, "replace");
    }, []);

    const setSortDirection = useCallback((sortDirection: "asc" | "desc") => {
      _setSortDirection(sortDirection);

      updateQueryParamByName("sort_direction", sortDirection, "replace");
    }, []);

    const [total, setTotal] = useState(0);
    const [data, setData] = useState<DataTableData>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(props.loading);

    const abortControllerRef = useRef<AbortController>(new AbortController());

    useEffect(() => {
      if (props.loading === true) {
        setIsLoading(props.loading);
      } else if (props.loading === false) {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }, [props.loading]);

    const dataRef = useRef<DataTableData>(data);

    useEffect(() => {
      dataRef.current = data;
    }, [data]);

    const dataHash = useRef<string>("");

    const [asyncData, setAsyncData] = useState<Record<string, DataTableData>>(
      {}
    );
    const [asyncLoading, setAsyncLoading] = useState<Record<string, boolean>>(
      {}
    );

    const fetchData = useCallback(
      (options?: { force?: boolean }) => {
        setIsError(false);

        if (typeof props.data === "function") {
          const hash = JSON.stringify({
            page,
            pageSize,
            sortColumn,
            sortDirection,
            search,
          });

          if (hash === dataHash.current && !options?.force) {
            return;
          }

          setIsLoading(true);

          // const shouldSkipAsync = props.async?.some((async) => {
          //   return async.columns.some((column) => {
          //     const model = props.columns.find((col) => col.dataPath === column);

          //     return model?.sortKey === sortColumn;
          //   });
          // });
          const shouldSkipAsync = false;

          dataHash.current = hash;

          if (abortControllerRef.current) {
            abortControllerRef.current.abort();
          }

          abortControllerRef.current = new AbortController();

          props
            .data(
              page,
              pageSize,
              sortColumn,
              sortDirection,
              search,
              abortControllerRef.current!,
              shouldSkipAsync
            )
            .then((response) => {
              setData(response.data ?? []);
              setTotal(response.total);

              props.onDataLoaded?.(response);
            })
            .catch(() => {
              setIsError(true);
            })
            .finally(() => {
              setIsLoading(false);
            });

          if (props.async) {
            if (shouldSkipAsync) {
              setAsyncLoading({});

              return;
            }

            props.async.forEach((async) => {
              setAsyncLoading((prev) => ({
                ...prev,
                [async.columns.join("/")]: true,
              }));

              async
                .data(
                  page,
                  pageSize,
                  sortColumn,
                  sortDirection,
                  search,
                  abortControllerRef.current!
                )
                .then((data) => {
                  setAsyncData((prev) => ({
                    ...prev,
                    [async.columns.join("/")]: data,
                  }));

                  setAsyncLoading((prev) => ({
                    ...prev,
                    [async.columns.join("/")]: false,
                  }));
                });
            });
          }
        } else {
          const dataToSet = [...(props.data ?? [])]
            .filter((item) => {
              return props.columns.some((column) => {
                return String(get(item, column.dataPath))
                  .toLowerCase()
                  .includes(search.toLowerCase());
              });
            })
            .sort((a, b) => {
              const propA = get(a, sortColumn);
              const propB = get(b, sortColumn);

              const timestampRegex =
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z$/;

              if (timestampRegex.test(propA) || timestampRegex.test(propB)) {
                if (!propA) {
                  return 1;
                }

                if (!propB) {
                  return -1;
                }

                return sortDirection === "desc"
                  ? moment(propB).diff(propA)
                  : moment(propA).diff(propB);
              }

              if (typeof propA === "string" && typeof propB === "string") {
                return sortDirection === "desc"
                  ? propB.localeCompare(propA)
                  : propA.localeCompare(propB);
              }

              return sortDirection === "desc" ? propB - propA : propA - propB;
            })
            .slice(page * pageSize, (page + 1) * pageSize);

          setData(dataToSet);
          setTotal(props.data?.length ?? 0);
          props.onDataLoaded?.({
            total: props.data?.length ?? 0,
            data: dataToSet,
          });
        }
      },
      [
        props.data,
        props.async,
        page,
        pageSize,
        sortColumn,
        props.columns,
        sortDirection,
        search,
        props.onDataLoaded,
      ]
    );

    const getAsyncDataForColumn = useCallback(
      (column: string) => {
        const key = props.async
          ?.find((async) => async.columns.includes(column))
          ?.columns.join("/");

        return asyncData[key ?? ""] ?? [];
      },
      [props.async, asyncData]
    );

    const getAsyncLoadingForColumn = useCallback(
      (column: string) => {
        const key = props.async
          ?.find((async) => async.columns.includes(column))
          ?.columns.join("/");

        return asyncLoading[key ?? ""] ?? false;
      },
      [props.async, asyncLoading]
    );

    useEffect(() => {
      fetchData();
    }, [
      props.data,
      props.async,
      page,
      pageSize,
      sortColumn,
      sortDirection,
      search,
      props.onDataLoaded,
      fetchData,
    ]);

    const isEmpty = useMemo(
      () => !isLoading && !isError && !data.length,
      [isLoading, isError, data]
    );

    const [mainContainerWidth, setMainContainerWidth] = useState(0);
    const [mainWidth, setMainWidth] = useState(0);
    const [fixedWidth, setFixedWidth] = useState(0);
    const [fixedLeftWidth, setFixedLeftWidth] = useState(0);
    const [columnsElements, setColumnsElements] = useState<HTMLDivElement[]>(
      []
    );
    const [scrollWidth, setScrollWidth] = useState(0);
    const [clientWidth, setClientWidth] = useState(0);

    useLayoutEffect(() => {
      setColumnsElements([
        ...(mainRef.current?.querySelectorAll<HTMLDivElement>(
          `.${styles.column}`
        ) ?? []),
      ]);
      setMainWidth(mainRef.current?.getBoundingClientRect().width ?? 0);
      setFixedWidth(fixedRef.current?.getBoundingClientRect().width ?? 0);
      setFixedLeftWidth(
        fixedLeftRef.current?.getBoundingClientRect().width ?? 0
      );
      setMainContainerWidth(
        mainContainerRef.current?.getBoundingClientRect().width ?? 0
      );
    }, [props.columns, props.data]);

    const [columnsWidths, setColumnsWidths] = useState<Record<string, number>>(
      props.resizeEnabled === false
        ? {}
        : localPreferences.get("dataTablesMeta")?.data?.[props.id ?? ""]
            ?.columnsWidth ?? {}
    );

    const [columnsMaxContentWidths, setColumnsMaxContentWidths] = useState<
      Record<string, number>
    >({});

    const defaultColumnsOrder = useMemo(() => {
      const order =
        localPreferences.get("dataTablesMeta")?.data?.[props.id ?? ""]
          ?.columnsOrder ?? props.columns.map((column) => column.dataPath);

      for (let i = 0; i < props.columns.length; i++) {
        if (!order.includes(props.columns[i].dataPath)) {
          if (i === 0) {
            order.unshift(props.columns[i].dataPath);
          } else {
            // insert by index
            order.splice(i, 0, props.columns[i].dataPath);
          }
        }
      }

      return order;
    }, []);

    const [columnsOrder, setColumnsOrder] =
      useState<string[]>(defaultColumnsOrder);

    useEffect(() => {
      return () => {
        abortControllerRef.current.abort();
      };
    }, []);

    useEffect(() => {
      if (!props.id) {
        return;
      }

      if (!props.resizeEnabled === false) {
        return;
      }
    }, [columnsWidths, props.resizeEnabled]);

    const swapColumns = useCallback(
      (a: string, b: string) => {
        setColumnsOrder((prev) => {
          return prev.map((path) => {
            if (path === a) {
              return b;
            } else if (path === b) {
              return a;
            } else {
              return path;
            }
          });
        });

        setColumnsWidths((prev) => {
          return {
            ...prev,
            [a]: prev[b],
            [b]: prev[a],
          };
        });
      },
      [columnsElements]
    );

    const getColumnsWidthsFromElements = useCallback(() => {
      const result: Record<string, number> = {};

      for (const columnElement of columnsElements) {
        const dataPath = columnElement.dataset.dataPath;

        if (!dataPath) {
          continue;
        }

        result[dataPath] = columnElement.getBoundingClientRect().width;
      }

      return result;
    }, [columnsElements]);

    const getColumnsMaxContentWidthsFromElements = useCallback(() => {
      const result: Record<string, number> = {};

      for (const columnElement of columnsElements) {
        const dataPath = columnElement.dataset.dataPath;

        if (!dataPath) {
          continue;
        }

        const cellsElements = columnElement.querySelectorAll<HTMLDivElement>(
          `.${styles.cell}`
        );

        const maxContentWidth = Math.max(
          ...Array.from(cellsElements).map((cellElement) => {
            let contentElement = cellElement?.children[0]?.children[0];

            if (!contentElement) {
              return 0;
            }

            if (contentElement.classList.contains("Tooltip")) {
              contentElement = contentElement.children[0];
            }

            return (contentElement.scrollWidth ?? 0) + 40;
          })
        );

        result[dataPath] = maxContentWidth;
      }

      return result;
    }, [columnsElements]);

    useLayoutEffect(() => {
      if (!mainRef.current) {
        return;
      }

      if (!Object.keys(columnsWidths).length) {
        setColumnsWidths(getColumnsWidthsFromElements());
      }

      setColumnsMaxContentWidths(getColumnsMaxContentWidthsFromElements());

      function onResize() {
        setScrollWidth(mainRef.current?.scrollWidth ?? 0);
        setClientWidth(mainRef.current?.clientWidth ?? 0);
        setMainWidth(mainRef.current?.getBoundingClientRect().width ?? 0);
        setFixedWidth(fixedRef.current?.getBoundingClientRect().width ?? 0);
        setFixedLeftWidth(
          fixedLeftRef.current?.getBoundingClientRect().width ?? 0
        );
        setMainContainerWidth(
          mainContainerRef.current?.getBoundingClientRect().width ?? 0
        );
        setMainContainerWidth(
          mainContainerRef.current?.getBoundingClientRect().width ?? 0
        );

        if (props.resizeEnabled === false) {
          setColumnsWidths({});
          setColumnsMaxContentWidths({});

          queueMicrotask(() => {
            setColumnsWidths(getColumnsWidthsFromElements());
            setColumnsMaxContentWidths(
              getColumnsMaxContentWidthsFromElements()
            );
          });
        }
      }

      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    }, [columnsElements, columnsWidths, props.resizeEnabled, mainRef, data]);

    const style: React.CSSProperties = useMemo(() => {
      const defaultMinWidth = props.embedded
        ? EMBEDDED_MIN_WIDTH
        : DEFAULT_MIN_WIDTH;

      let gridTemplateColumns = props.columns.map((column, index) => {
        const isFirst = index === 0;

        if (props.embedded) {
          return `minmax(${defaultMinWidth}px, 1fr)`;
        }

        if (!isFirst && columnsWidths[column.dataPath]) {
          return `${columnsWidths[column.dataPath]}px`;
        }

        const minWidth = column.minWidth
          ? `${column.minWidth}px`
          : `${defaultMinWidth}px`;
        let maxWidth = column.maxWidth
          ? `${column.maxWidth}px`
          : DEFAULT_MAX_WIDTH;

        if (isFirst) {
          if (columnsWidths[column.dataPath]) {
            return `minmax(${columnsWidths[column.dataPath]}px, 1fr)`;
          }

          return `minmax(${minWidth}, 1fr)`;
        }

        return `minmax(${minWidth}, ${maxWidth})`;
      });

      return {
        gridTemplateColumns: gridTemplateColumns.join(" "),
      };
    }, [columnsOrder, columnsWidths, props.columns, props.embedded]);

    useImperativeHandle(ref, () => ({}), []);

    const [dragColumnDataPath, setDragColumnDataPath] = useState<string | null>(
      null
    );
    const ghostRef = useRef<HTMLDivElement>(null);

    const dragColumn = useMemo(
      () =>
        props.columns.find((column) => column.dataPath === dragColumnDataPath),
      [dragColumnDataPath, props.columns]
    );

    const onDragStart = useCallback(
      (columnDataPath: string, clientX: number, clientY: number) => {
        setDragColumnDataPath(columnDataPath);

        document.body.style.userSelect = "none";

        ghostRef.current?.style.setProperty("--x", `${clientX}px`);
        ghostRef.current?.style.setProperty("--y", `${clientY}px`);
      },
      []
    );

    const lastClientX = useRef(0);

    const [resizeColumnDataPath, setResizeColumnDataPath] = useState<
      string | null
    >(null);

    const onResizeStart = useCallback((columnDataPath: string) => {
      lastClientX.current = 0;

      setResizeColumnDataPath(columnDataPath);

      document.body.style.userSelect = "none";
    }, []);

    const onResizeDoubleClick = useCallback(
      (columnDataPath: string) => {
        setColumnsWidths((prev) => {
          const column = props.columns.find(
            (column) => column.dataPath === columnDataPath
          );

          return {
            ...prev,
            [columnDataPath]: Math.max(
              column?.minWidth ?? DEFAULT_MIN_WIDTH,
              columnsMaxContentWidths[columnDataPath]
            ),
          };
        });
      },
      [columnsMaxContentWidths, props.columns]
    );

    useEffect(() => {
      if (!dragColumnDataPath && !resizeColumnDataPath) {
        return;
      }

      function onMouseUp() {
        setDragColumnDataPath(null);
        setResizeColumnDataPath(null);
        document.body.style.userSelect = "";
      }

      function onMouseMove(ev: MouseEvent) {
        if (dragColumnDataPath) {
          const dragColumnIndex = columnsOrder.indexOf(dragColumnDataPath);

          for (const columnElement of columnsElements) {
            const targetColumnDataPath = columnElement.dataset.dataPath;

            if (!targetColumnDataPath) {
              continue;
            }

            const targetColumnIndex =
              columnsOrder.indexOf(targetColumnDataPath);

            const { left, width } = columnElement.getBoundingClientRect();

            if (ev.clientX > left && ev.clientX < left + width) {
              const columnCenter = left + width / 2;

              if (
                dragColumnIndex > targetColumnIndex &&
                ev.clientX < columnCenter - 20
              ) {
                swapColumns(targetColumnDataPath, dragColumnDataPath);
                continue;
              }

              if (
                dragColumnIndex < targetColumnIndex &&
                ev.clientX > columnCenter + 20
              ) {
                swapColumns(targetColumnDataPath, dragColumnDataPath);
                continue;
              }
            }
          }
        }

        if (resizeColumnDataPath) {
          if (lastClientX.current > 0) {
            const deltaX = ev.clientX - lastClientX.current;

            setColumnsWidths((prev) => {
              const column = props.columns.find(
                (column) => column.dataPath === resizeColumnDataPath
              );

              return {
                ...prev,
                [resizeColumnDataPath]: Math.max(
                  prev[resizeColumnDataPath] + deltaX,
                  column?.minWidth ?? DEFAULT_MIN_WIDTH
                ),
              };
            });
          }
        }

        lastClientX.current = ev.clientX;
        ghostRef.current?.style.setProperty("--x", `${ev.clientX}px`);
        ghostRef.current?.style.setProperty("--y", `${ev.clientY}px`);
      }

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };
    }, [
      dragColumnDataPath,
      resizeColumnDataPath,
      props.columns,
      columnsElements,
      columnsOrder,
    ]);

    const [fixedVisible, setFixedVisible] = useState(false);
    const [fixedFooterVisible, setFixedFooterVisible] = useState(false);
    const [initialTop, setInitialTop] = useState(0);
    const [scrollParent, setScrollParent] = useState<HTMLElement | null>(null);
    const requestRef = useRef<number | null>(null);

    useLayoutEffect(() => {
      if (wrapperRef.current) {
        setInitialTop(wrapperRef.current.getBoundingClientRect().top);

        let parent = wrapperRef.current.parentElement;

        while (parent && getComputedStyle(parent).overflowY === "visible") {
          parent = parent.parentElement;
        }

        setScrollParent(parent);
      }
    }, []);

    useLayoutEffect(() => {
      if (scrollParent) {
        function onScroll(e: Event) {
          if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
          }

          requestRef.current = requestAnimationFrame(() => {
            if (scrollParent && wrapperRef.current) {
              const top = scrollParent.scrollTop;

              setFixedVisible(top + 48 > initialTop);
              setFixedFooterVisible(
                wrapperRef.current.getBoundingClientRect().bottom >
                  window.innerHeight - 40
              );
            }
          });
        }

        scrollParent.addEventListener("scroll", onScroll);

        onScroll(new Event("scroll"));

        return () => {
          scrollParent.removeEventListener("scroll", onScroll);
        };
      }
    }, [scrollParent, initialTop, data]);

    useLayoutEffect(() => {
      if (mainRef.current) {
        setScrollWidth(mainRef.current.scrollWidth);
        setClientWidth(mainRef.current.clientWidth);
      }
    }, [columnsWidths]);

    const scrollHandleWidth =
      Math.max(
        4,
        Math.min((clientWidth / scrollWidth) * clientWidth, clientWidth)
      ) - 8;

    const mainScrollHandleRef = useRef<HTMLDivElement>(null);
    const fixedScrollHandleRef = useRef<HTMLDivElement>(null);

    const onMainScroll = useCallback(
      (e: React.UIEvent<HTMLDivElement>) => {
        const scrollLeftValue = e.currentTarget.scrollLeft;

        if (fixedHeaderRef.current) {
          fixedHeaderRef.current.scrollLeft = scrollLeftValue;
        }

        const left = Math.max(
          4,
          Math.min(
            (scrollLeftValue / scrollWidth) * clientWidth + 4,
            clientWidth - scrollHandleWidth + 4
          )
        );

        if (mainScrollHandleRef.current) {
          mainScrollHandleRef.current.style.left = `${left}px`;
        }

        if (fixedScrollHandleRef.current) {
          fixedScrollHandleRef.current.style.left = `${left}px`;
        }
      },
      [clientWidth, scrollWidth, scrollHandleWidth]
    );

    const onFixedScroll = useCallback(
      (e: React.UIEvent<HTMLDivElement>) => {
        if (mainRef.current) {
          const scrollLeftValue = e.currentTarget.scrollLeft;

          mainRef.current.scrollLeft = scrollLeftValue;

          const left = Math.max(
            4,
            Math.min(
              (scrollLeftValue / scrollWidth) * clientWidth + 4,
              clientWidth - scrollHandleWidth + 4
            )
          );

          if (mainScrollHandleRef.current) {
            mainScrollHandleRef.current.style.left = `${left}px`;
          }

          if (fixedScrollHandleRef.current) {
            fixedScrollHandleRef.current.style.left = `${left}px`;
          }
        }
      },
      [clientWidth, scrollWidth, scrollHandleWidth]
    );

    const onStatusWheel = useCallback(
      (e: React.WheelEvent<HTMLDivElement>) => {
        if (mainRef.current) {
          mainRef.current.scrollLeft += e.deltaX;
        }
      },
      [mainRef]
    );

    const [isScrollActive, setIsScrollActive] = useState(false);

    const onScrollHandleMouseDown = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();

        setIsScrollActive(true);
        lastClientX.current = e.clientX;
        document.body.style.userSelect = "none";
      },
      []
    );

    useEffect(() => {
      if (isScrollActive) {
        function onMouseMove(ev: MouseEvent) {
          if (lastClientX.current > 0) {
            const deltaX = ev.clientX - lastClientX.current;

            if (mainRef.current) {
              mainRef.current.scrollLeft += deltaX;
            }

            lastClientX.current = ev.clientX;
          }
        }

        function onMouseUp() {
          setIsScrollActive(false);
          lastClientX.current = 0;
        }

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
        };
      }
    }, [isScrollActive]);

    const lastPage = Math.ceil(total / pageSize) - 1;

    const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
    const [selectedRowsIndexes, setSelectedRowsIndexes] = useState<number[]>(
      []
    );

    const selectRow = useCallback(
      (index: number) => {
        if (props.selection === "single") {
          setSelectedRowsIndexes([index]);
        } else {
          setSelectedRowsIndexes((prev) => {
            if (prev.includes(index)) {
              return prev.filter((i) => i !== index);
            }

            return [...prev, index];
          });
        }
      },
      [props.selection]
    );

    const unselectRow = useCallback(
      (index: number) => {
        setSelectedRowsIndexes((prev) => prev.filter((i) => i !== index));
      },
      [selectedRowsIndexes]
    );

    const selectAllRows = useCallback(() => {
      if (selectedRowsIndexes.length === data.length) {
        setSelectedRowsIndexes([]);
      } else {
        setSelectedRowsIndexes(
          data
            .map((_, i) => i)
            .filter((i) => !props.disallowSelection?.(data[i]))
        );
      }
    }, [data, selectedRowsIndexes, props.disallowSelection]);

    const clearSelection = useCallback(() => {
      setSelectedRowsIndexes([]);
    }, []);

    const isRowSelected = useCallback(
      (index: number) => {
        return selectedRowsIndexes.includes(index);
      },
      [selectedRowsIndexes]
    );

    const areAllRowsSelected = useMemo(() => {
      if (selectedRowsIndexes.length === 0) {
        return false;
      }

      return (
        selectedRowsIndexes.length ===
        data.filter((r) => !props.disallowSelection?.(r)).length
      );
    }, [selectedRowsIndexes, data]);

    const renderActions = useCallback(
      (value: any, dataRow: DataTableDataRow) => {
        if (props.actions?.length === 1) {
          return (
            <div className="ListInlineActions">
              {props.actions?.map((action, i) => {
                if (!action.icon) {
                  return null;
                }

                if (action.shouldRender && !action.shouldRender(dataRow)) {
                  return null;
                }

                if (action.callback) {
                  return (
                    <Tooltip text={action.title}>
                      <div
                        tabIndex={0}
                        className="ListAction"
                        onClick={() => action.callback!(dataRow)}
                      >
                        {action.icon && <Icon size={16} icon={action.icon} />}
                      </div>
                    </Tooltip>
                  );
                }

                if (action.href) {
                  return (
                    <Tooltip text={action.title}>
                      <Link
                        tabIndex={0}
                        className="ListAction"
                        to={action.href(dataRow)}
                      >
                        {action.icon && <Icon size={16} icon={action.icon} />}
                      </Link>
                    </Tooltip>
                  );
                }

                return null;
              })}
            </div>
          );
        }

        return (
          <Menu
            className={styles.actions}
            key={"actions"}
            placement="right"
            target={
              <Button size={ButtonSize.Small} icon variant={ButtonVariant.Text}>
                <Icon size={16} icon={<More />} />
              </Button>
            }
            onSelect={(value) => {
              const action = props.actions!.find((a) => a.title === value);

              if (action?.callback) {
                action.callback(dataRow);
              }
            }}
          >
            {props
              .actions!.filter((a) =>
                a.shouldRender ? a.shouldRender(dataRow) : true
              )
              .map((a, i) => {
                if (a.children) {
                  return (
                    <Menu
                      key={i}
                      position="left"
                      trigger="hover"
                      target={
                        <MenuOption>
                          <div className="ListActionOption">
                            {a.title}
                            <Icon icon={<IconRight />} size={12} />
                          </div>
                        </MenuOption>
                      }
                    >
                      {a.children.map((child, j) => {
                        if (
                          child.shouldRender &&
                          !child.shouldRender(dataRow)
                        ) {
                          return null;
                        }

                        if (child.callback) {
                          return (
                            <MenuOption
                              key={j}
                              value={child.title}
                              onClick={() => child.callback!(dataRow)}
                            >
                              <div className="ListActionOption">
                                {child.icon && (
                                  <Icon size={16} icon={child.icon} />
                                )}
                                {child.title}
                              </div>
                            </MenuOption>
                          );
                        }

                        if (child.href) {
                          return (
                            <MenuOption
                              key={j}
                              value={child.title}
                              href={child.href(dataRow)}
                            >
                              <div className="ListActionOption">
                                {child.icon && (
                                  <Icon size={16} icon={child.icon} />
                                )}
                                {child.title}
                              </div>
                            </MenuOption>
                          );
                        }

                        return null;
                      })}
                    </Menu>
                  );
                }

                if (a.callback) {
                  return (
                    <MenuOption key={i} value={a.title}>
                      <div className="ListActionOption">
                        {a.icon && <Icon size={16} icon={a.icon} />}
                        {a.title}
                      </div>
                    </MenuOption>
                  );
                }

                if (a.href) {
                  return (
                    <MenuOption key={i} value={a.title} href={a.href(dataRow)}>
                      <div className="ListActionOption">
                        {a.icon && <Icon size={16} icon={a.icon} />}
                        {a.title}
                      </div>
                    </MenuOption>
                  );
                }

                return null;
              })}
          </Menu>
        );
      },
      [props.actions]
    );

    return (
      <div
        className={classNames(
          styles.container,
          props.embedded && styles.embedded,
          props.resizeEnabled === false && styles.noresize,
          dragColumnDataPath && styles.dragging,
          resizeColumnDataPath && styles.resizing,
          isEmpty && styles.empty,
          isError && styles.error,
          isLoading && styles.loading,
          clientWidth < scrollWidth && styles.scrollVisible,
          props.innerScroll && styles.innerScroll,
          props.className,
          props.selection && styles.hasSelection,
          lastPage !== 0 && styles.hasFooter
        )}
      >
        {!!props.title && (
          <div className={styles.title}>
            {props.title}
            {!props.loading && ` (${total})`}
            {!!props.create && (
              <div className="ListCreate">
                <Button
                  onClick={props.create.handler}
                  variant={ButtonVariant.Link}
                >
                  {props.create.label}
                  <Icon icon={<AddCircle />} size={16} />
                </Button>
              </div>
            )}
          </div>
        )}
        {props.search && (
          <div className={styles.search}>
            <TextInput
              className={styles.input}
              prefix={<Icon icon={<IconSearch />} size={16} />}
              placeholder="Search"
              onChange={setSearch}
              clearBtn
            />
            {props.headerSuffix && (
              <div className={styles.suffix}>{props.headerSuffix}</div>
            )}
          </div>
        )}
        {!!props.bulkActions?.length && (
          <div className={styles.bulkActions}>
            <div className={styles.count}>
              {selectedRowsIndexes.length} selected
            </div>
            <div className={styles.buttons}>
              {props.bulkActions.map((action, i) => {
                return (
                  <Button
                    key={i}
                    className={styles.bulkAction}
                    onClick={() => {
                      action.callback?.(
                        selectedRowsIndexes.map((index) => data[index]),
                        clearSelection
                      );
                    }}
                    disabled={!selectedRowsIndexes.length}
                    variant={ButtonVariant.Link}
                  >
                    {action.icon && <Icon icon={action.icon} size={16} />}
                    {action.title}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
        <div
          className={classNames(styles.wrapper, dragColumnDataPath)}
          ref={wrapperRef}
        >
          {(props.stickyHeader || props.innerScroll || props.embedded) && (
            <div
              className={classNames(
                styles.fixedHeader,
                fixedVisible && styles.visible
              )}
              style={{
                width: mainContainerWidth || 0,
              }}
            >
              {!!props.selection && (
                <div
                  className={classNames(
                    styles.fixed,
                    styles.left,
                    clientWidth > scrollWidth && styles.shadow
                  )}
                  ref={fixedLeftRef}
                  style={{
                    width: fixedLeftWidth || 0,
                  }}
                >
                  <DataTableColumn
                    data={[]}
                    title="Checkbox"
                    renderTitle={() => {
                      return (
                        <Checkbox
                          value={areAllRowsSelected}
                          partial={
                            selectedRowsIndexes.length > 0 &&
                            !areAllRowsSelected
                          }
                          onChange={(value) =>
                            value ? selectAllRows() : clearSelection()
                          }
                        />
                      );
                    }}
                    dataPath="inigo.selection"
                    alignContent="left"
                    draggable={false}
                    renderContent={(value, dataRow) => {
                      return (
                        <Checkbox
                          value={isRowSelected(data.indexOf(dataRow))}
                          disabled={props.disallowSelection?.(dataRow) ?? false}
                        />
                      );
                    }}
                    width={mainWidth}
                    isDragging={false}
                    isResizing={false}
                    onDragStart={onDragStart}
                    onResizeStart={onResizeStart}
                    onResizeDoubleClick={onResizeDoubleClick}
                    hoveredRowIndex={hoveredRowIndex}
                    isRowFocused={props.isRowFocused}
                    onMouseOver={(index) => setHoveredRowIndex(index)}
                    onMouseLeave={() => setHoveredRowIndex(null)}
                    resizeEnabled={props.resizeEnabled}
                    onRowClick={props.onRowClick}
                  />
                </div>
              )}
              <div
                className={styles.static}
                style={{
                  ...style,
                  width: mainWidth || 0,
                }}
                ref={fixedHeaderRef}
                onScroll={onFixedScroll}
              >
                {props.columns
                  .sort((a, b) => {
                    const indexA = columnsOrder.indexOf(a.dataPath);
                    const indexB = columnsOrder.indexOf(b.dataPath);

                    return indexA - indexB;
                  })
                  .map((column, i) => {
                    const isDragging = dragColumnDataPath === column.dataPath;
                    const isResizing = resizeColumnDataPath === column.dataPath;

                    return (
                      <DataTableColumn
                        key={column.dataPath}
                        {...column}
                        data={[]}
                        width={columnsWidths[column.dataPath] || -1}
                        isDragging={isDragging}
                        isResizing={isResizing}
                        onDragStart={onDragStart}
                        onResizeStart={onResizeStart}
                        onResizeDoubleClick={onResizeDoubleClick}
                        onSort={(columnDataPath, sortDirection) => {
                          setSortColumn(columnDataPath);
                          setSortDirection(sortDirection);
                        }}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        search={search}
                        hoveredRowIndex={hoveredRowIndex}
                        isRowFocused={props.isRowFocused}
                        onMouseOver={(index) => setHoveredRowIndex(index)}
                        onMouseLeave={() => setHoveredRowIndex(null)}
                        resizeEnabled={props.resizeEnabled}
                        onRowClick={props.onRowClick}
                      />
                    );
                  })}
              </div>
              {!!props.actions?.length && (
                <div
                  className={classNames(
                    styles.fixed,
                    clientWidth < scrollWidth && styles.shadow
                  )}
                  style={{
                    width: fixedWidth || 0,
                  }}
                >
                  <DataTableColumn
                    data={[]}
                    title="Actions"
                    dataPath="inigo.actions"
                    width={mainWidth}
                    draggable={false}
                    isDragging={false}
                    isResizing={false}
                    onDragStart={onDragStart}
                    onResizeStart={onResizeStart}
                    onResizeDoubleClick={onResizeDoubleClick}
                    search={search}
                  />
                </div>
              )}
            </div>
          )}
          <div
            ref={ghostRef}
            className={classNames(styles.ghost, !!dragColumn && styles.visible)}
            // style={{ height: dragColumnHeight }}
          >
            {!!dragColumn && (
              <DataTableColumn
                {...dragColumn}
                data={data}
                width={columnsWidths[dragColumn.dataPath] || -1}
                isDragging={false}
                isResizing={false}
                onDragStart={() => {}}
                onResizeDoubleClick={() => {}}
                onResizeStart={() => {}}
                onSort={() => {}}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                search={search}
                hoveredRowIndex={hoveredRowIndex}
                isRowFocused={props.isRowFocused}
                onMouseOver={() => {}}
                onMouseLeave={() => {}}
                resizeEnabled={props.resizeEnabled}
                onRowClick={props.onRowClick}
              />
            )}
          </div>
          <div className={styles.main} ref={mainContainerRef}>
            {!!props.selection && (
              <div
                className={classNames(
                  styles.fixed,
                  styles.left,
                  clientWidth > scrollWidth && styles.shadow
                )}
                ref={fixedLeftRef}
              >
                <DataTableColumn
                  data={data}
                  title="Checkbox"
                  renderTitle={() => {
                    return (
                      <Checkbox
                        value={areAllRowsSelected}
                        partial={
                          selectedRowsIndexes.length > 0 && !areAllRowsSelected
                        }
                        onChange={(value) =>
                          value ? selectAllRows() : clearSelection()
                        }
                      />
                    );
                  }}
                  dataPath="inigo.selection"
                  alignContent="left"
                  draggable={false}
                  renderContent={(value, dataRow) => {
                    const index = data.indexOf(dataRow);

                    return (
                      <Checkbox
                        value={isRowSelected(index)}
                        onChange={(value) =>
                          value ? selectRow(index) : unselectRow(index)
                        }
                        disabled={props.disallowSelection?.(dataRow) ?? false}
                      />
                    );
                  }}
                  width={mainWidth}
                  isDragging={false}
                  isResizing={false}
                  onDragStart={onDragStart}
                  onResizeStart={onResizeStart}
                  onResizeDoubleClick={onResizeDoubleClick}
                  hoveredRowIndex={hoveredRowIndex}
                  isRowFocused={props.isRowFocused}
                  onMouseOver={(index) => setHoveredRowIndex(index)}
                  onMouseLeave={() => setHoveredRowIndex(null)}
                  resizeEnabled={props.resizeEnabled}
                  onRowClick={props.onRowClick}
                />
              </div>
            )}
            <div
              className={styles.static}
              style={style}
              ref={mainRef}
              onScroll={onMainScroll}
            >
              {props.columns
                .sort((a, b) => {
                  const indexA = columnsOrder.indexOf(a.dataPath);
                  const indexB = columnsOrder.indexOf(b.dataPath);

                  return indexA - indexB;
                })
                .map((column, i) => {
                  const isDragging = dragColumnDataPath === column.dataPath;
                  const isResizing = resizeColumnDataPath === column.dataPath;

                  return (
                    <DataTableColumn
                      key={column.dataPath}
                      {...column}
                      data={data}
                      skipAsync={false}
                      asyncData={getAsyncDataForColumn(column.dataPath)}
                      asyncLoading={getAsyncLoadingForColumn(column.dataPath)}
                      isLoading={isLoading}
                      width={columnsWidths[column.dataPath] || -1}
                      isDragging={isDragging}
                      isResizing={isResizing}
                      onDragStart={onDragStart}
                      onResizeStart={onResizeStart}
                      onResizeDoubleClick={onResizeDoubleClick}
                      onSort={(columnDataPath, sortDirection) => {
                        setSortColumn(columnDataPath);
                        setSortDirection(sortDirection);
                      }}
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      search={search}
                      hoveredRowIndex={hoveredRowIndex}
                      isRowFocused={props.isRowFocused}
                      onMouseOver={(index) => setHoveredRowIndex(index)}
                      onMouseLeave={() => setHoveredRowIndex(null)}
                      resizeEnabled={props.resizeEnabled}
                      onRowClick={props.onRowClick}
                    />
                  );
                })}
            </div>
            {!!props.actions?.length && (
              <div
                className={classNames(
                  styles.fixed,
                  clientWidth < scrollWidth && styles.shadow
                )}
                ref={fixedRef}
              >
                <DataTableColumn
                  data={data}
                  title="Actions"
                  dataPath="inigo.actions"
                  alignContent="right"
                  draggable={false}
                  renderContent={renderActions}
                  width={mainWidth}
                  isDragging={false}
                  isResizing={false}
                  onDragStart={onDragStart}
                  onResizeStart={onResizeStart}
                  onResizeDoubleClick={onResizeDoubleClick}
                  hoveredRowIndex={hoveredRowIndex}
                  isRowFocused={props.isRowFocused}
                  onMouseOver={(index) => setHoveredRowIndex(index)}
                  onMouseLeave={() => setHoveredRowIndex(null)}
                  resizeEnabled={props.resizeEnabled}
                  onRowClick={props.onRowClick}
                />
              </div>
            )}
          </div>
        </div>
        {[isEmpty, isError, isLoading && !dataRef.current.length].some(
          (v) => v
        ) && (
          <div className={styles.status} onWheel={onStatusWheel}>
            {isLoading && <Loader className={styles.loader} visible />}
            {isEmpty && !props.embedded && (
              <>
                {props.renderEmpty ? (
                  props.renderEmpty()
                ) : (
                  <div className={styles.empty}>
                    {props.emptyText || "No data available"}
                  </div>
                )}
              </>
            )}
            {isError && (
              <div className={styles.error}>
                <Error
                  style={{ zIndex: 20 }}
                  compact
                  onTryAgain={() => fetchData({ force: true })}
                />
              </div>
            )}
          </div>
        )}
        {lastPage !== 0 && (
          <>
            {props.stickyHeader && (
              <div
                className={classNames(
                  styles.footer,
                  styles.fixedFooter,
                  fixedFooterVisible && styles.visible
                )}
                style={{
                  width: mainContainerWidth || 0,
                }}
              >
                <div
                  className={classNames(styles.scroll, {
                    [styles.visible]: clientWidth < scrollWidth,
                  })}
                >
                  <div
                    className={classNames(
                      styles.handle,
                      isScrollActive && styles.active
                    )}
                    ref={fixedScrollHandleRef}
                    style={{
                      width: scrollHandleWidth || 0,
                      willChange: "left, width",
                    }}
                    onMouseDown={onScrollHandleMouseDown}
                  />
                </div>
                <div className={styles.total}>
                  Records: {renderBigNumber(total)}
                </div>
                <div className={styles.pagination}>
                  {pageSizeOptions.length > 1 && (
                    <>
                      <span className={styles.label}>Items per page:</span>
                      <Select
                        value={pageSize}
                        onChange={(value) => setPageSize(value as number)}
                        position="top"
                        className={styles.pageSize}
                      >
                        {[...[...pageSizeOptions].reverse()].map((i) => (
                          <SelectOption
                            key={i}
                            value={i}
                            className={classNames(
                              styles.pageSizeOption,
                              i === pageSize && styles.active
                            )}
                          >
                            {i}
                          </SelectOption>
                        ))}
                      </Select>
                    </>
                  )}
                  <span className={styles.page}>
                    {renderBigNumber(page + 1)} of{" "}
                    {renderBigNumber(lastPage + 1)}
                  </span>
                  <Button
                    size={ButtonSize.Small}
                    variant={ButtonVariant.Text}
                    icon
                    disabled={page === 0}
                    onClick={() => setPage(0)}
                  >
                    <Icon icon={<GoToFirst />} size={12} />
                  </Button>
                  <Button
                    size={ButtonSize.Small}
                    variant={ButtonVariant.Text}
                    icon
                    disabled={page === 0}
                    onClick={() => setPage(page - 1)}
                  >
                    <Icon icon={<ArrowLeft />} size={12} />
                  </Button>
                  <Button
                    size={ButtonSize.Small}
                    variant={ButtonVariant.Text}
                    icon
                    disabled={page === lastPage}
                    onClick={() => setPage(page + 1)}
                  >
                    <Icon icon={<ArrowRight />} size={12} />
                  </Button>
                  <Button
                    size={ButtonSize.Small}
                    variant={ButtonVariant.Text}
                    icon
                    disabled={page === lastPage}
                    onClick={() => setPage(lastPage)}
                  >
                    <Icon icon={<GoToLast />} size={12} />
                  </Button>
                </div>
              </div>
            )}
            <div className={styles.footer}>
              <div
                className={classNames(styles.scroll, {
                  [styles.visible]: clientWidth < scrollWidth,
                })}
                style={{
                  opacity: fixedFooterVisible
                    ? 0
                    : clientWidth < scrollWidth
                    ? 1
                    : 0,
                }}
              >
                <div
                  className={classNames(
                    styles.handle,
                    isScrollActive && styles.active
                  )}
                  ref={mainScrollHandleRef}
                  style={{
                    width: scrollHandleWidth || 0,
                    willChange: "left, width",
                  }}
                  onMouseDown={onScrollHandleMouseDown}
                />
              </div>
              <div className={styles.total}>
                Records: {renderBigNumber(total)}
              </div>
              <div className={styles.pagination}>
                {pageSizeOptions.length > 1 && (
                  <>
                    <span className={styles.label}>Items per page:</span>
                    <Select
                      value={pageSize}
                      onChange={(value) => setPageSize(value as number)}
                      position="top"
                      className={styles.pageSize}
                    >
                      {[...[...pageSizeOptions].reverse()].map((i) => (
                        <SelectOption
                          key={i}
                          value={i}
                          className={classNames(
                            styles.pageSizeOption,
                            i === pageSize && styles.active
                          )}
                        >
                          {i}
                        </SelectOption>
                      ))}
                    </Select>
                  </>
                )}
                <span className={styles.page}>
                  {renderBigNumber(page + 1)} of {renderBigNumber(lastPage + 1)}
                </span>
                <Button
                  size={ButtonSize.Small}
                  variant={ButtonVariant.Text}
                  icon
                  disabled={page === 0}
                  onClick={() => setPage(0)}
                >
                  <Icon icon={<GoToFirst />} size={12} />
                </Button>
                <Button
                  size={ButtonSize.Small}
                  variant={ButtonVariant.Text}
                  icon
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                >
                  <Icon icon={<ArrowLeft />} size={12} />
                </Button>
                <Button
                  size={ButtonSize.Small}
                  variant={ButtonVariant.Text}
                  icon
                  disabled={page === lastPage}
                  onClick={() => setPage(page + 1)}
                >
                  <Icon icon={<ArrowRight />} size={12} />
                </Button>
                <Button
                  size={ButtonSize.Small}
                  variant={ButtonVariant.Text}
                  icon
                  disabled={page === lastPage}
                  onClick={() => setPage(lastPage)}
                >
                  <Icon icon={<GoToLast />} size={12} />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
);
