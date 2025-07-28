import styles from "./Widget.module.css";

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import jp from "jsonpath";
import get from "lodash/get";
import merge from "lodash/merge";

import {
  DashboardWidgetProps,
  DashboardWidgetPropsChart,
  DashboardWidgetPropsChartCountOptions,
  DashboardWidgetPropsChartLineOptions,
  DashboardWidgetPropsChartListOptions,
  DashboardWidgetPropsChartPieOptions,
  DashboardWidgetPropsChartType,
  DashboardWidgetPropsTab,
} from "./Widget.types";

import { useMap } from "../../../../utils/helpers";

// import Icon, {
//   BarChart as BarChartIcon,
//   LineChart as LineChartIcon,
//   PieChart as PieChartIcon,
// } from '../../../Icon/Icon';
// import SegmentedControl, {
//   Option as SegmentedControlOption,
// } from '../../../SegmentedControl/SegmentedControl';
import LineChart from "../../../LineChart/LineChart";
import PieChart from "../../../PieChart/PieChart";
import Loader from "../../../Loader/Loader";
import Error from "../../../Error/Error";
import BarChart from "../../../BarChart/BarChart";
import ListChart from "../../../ListChart/ListChart";
import DashboardWidgetChartEmpty from "../Empty/Empty";
import { fetcher } from "../../../../utils/fetcher";
import CountChart from "../../../CountChart/CountChart";
import { BarChartBar } from "../../../BarChart/BarChart.types";
import Tooltip, { TooltipPosition } from "../../../Tooltip/Tooltip";

// const CHART_ICONS = {
//   [DashboardWidgetPropsChartType.Line]: <LineChartIcon />,
//   [DashboardWidgetPropsChartType.Bar]: <BarChartIcon />,
//   [DashboardWidgetPropsChartType.Pie]: <PieChartIcon />,
//   [DashboardWidgetPropsChartType.List]: <LineChartIcon />,
//   [DashboardWidgetPropsChartType.Block]: <LineChartIcon />,
// };

const CHART_RENDERERS = {
  [DashboardWidgetPropsChartType.Line]: (
    props: DashboardWidgetPropsChart,
    data: any,
    previousData: any,
    filter: any,
    state: Record<string, any>,
    renderActions?: () => React.ReactNode
  ) => {
    return (
      <LineChart
        data={data}
        {...(
          props as DashboardWidgetPropsChart<DashboardWidgetPropsChartLineOptions>
        ).options}
      />
    );
  },
  [DashboardWidgetPropsChartType.Bar]: (
    props: DashboardWidgetPropsChart,
    data: any,
    previousData: any,
    filter: any,
    state: Record<string, any>,
    renderActions?: () => React.ReactNode
  ) => {
    return (
      <BarChart
        className={styles.barChart}
        data={data}
        {...{
          ...props.options,
          bars: props.options.bars?.map((bar: BarChartBar) => ({
            ...bar,
            computeHref: (item: any, dataItem: any) => {
              return (
                bar.computeHref?.(item, dataItem, filter, data, state) ?? ""
              );
            },
          })),
          axis: props.options.axis
            ? {
                ...props.options.axis,
                x: props.options.axis.x
                  ? {
                      ...props.options.axis.x,
                      computeHref: (value: any, dataItem: any) => {
                        return (
                          props.options.axis?.x?.computeHref?.(
                            value,
                            dataItem,
                            filter,
                            data,
                            state
                          ) ?? ""
                        );
                      },
                    }
                  : undefined,
                y: props.options.axis.y
                  ? {
                      ...props.options.axis.y,
                      computeHref: (value: any, dataItem: any) => {
                        return (
                          props.options.axis?.y?.computeHref?.(
                            value,
                            dataItem,
                            filter,
                            data,
                            state
                          ) ?? ""
                        );
                      },
                    }
                  : undefined,
              }
            : undefined,
        }}
        renderActions={renderActions}
      />
    );
  },
  [DashboardWidgetPropsChartType.Pie]: (
    props: DashboardWidgetPropsChart,
    data: any,
    previousData: any,
    filter: any,
    state: Record<string, any>,
    renderActions?: () => React.ReactNode
  ) => {
    const pieProps =
      props as DashboardWidgetPropsChart<DashboardWidgetPropsChartPieOptions>;

    return (
      <PieChart
        data={data}
        size={180}
        {...pieProps.options}
        legend={
          pieProps.options.legend
            ? {
                ...pieProps.options.legend,
                computeHref: (value) => {
                  return (
                    pieProps.options.legend?.computeHref?.(value, filter) ?? ""
                  );
                },
              }
            : undefined
        }
      />
    );
  },
  [DashboardWidgetPropsChartType.List]: (
    props: DashboardWidgetPropsChart,
    data: any,
    previousData: any,
    filter: any,
    state: Record<string, any>,
    renderActions?: () => React.ReactNode
  ) => {
    return (
      <ListChart
        className={styles.listChart}
        data={data}
        {...(
          props as DashboardWidgetPropsChart<DashboardWidgetPropsChartListOptions>
        ).options}
      />
    );
  },
  [DashboardWidgetPropsChartType.Block]: (
    props: DashboardWidgetPropsChart,
    data: any,
    previousData: any,
    filter: any,
    state: Record<string, any>,
    renderActions?: () => React.ReactNode
  ) => {
    return null;
  },
  [DashboardWidgetPropsChartType.Count]: (
    props: DashboardWidgetPropsChart,
    data: any,
    previousData: any,
    filter: any,
    state: Record<string, any>,
    renderActions?: () => React.ReactNode
  ) => {
    return (
      <CountChart
        dataPath={props.options.dataPath}
        previousDataPath={props.options.previousDataPath}
        computeHref={
          (
            props as DashboardWidgetPropsChart<DashboardWidgetPropsChartCountOptions>
          ).options.computeHref
        }
        renderValue={
          (
            props as DashboardWidgetPropsChart<DashboardWidgetPropsChartCountOptions>
          ).options.renderValue
        }
        data={data}
        previousData={previousData}
        invert={
          (
            props as DashboardWidgetPropsChart<DashboardWidgetPropsChartCountOptions>
          ).options.invert
        }
      />
    );
  },
};

const DashboardWidget = (props: DashboardWidgetProps) => {
  const [state, setState] = useState<Record<string, any>>(
    props.defaultState ?? {}
  );

  const [activeTab, setActiveTab] = useState<DashboardWidgetPropsTab>(
    props.tabs[0]
  );
  const [activeChart, setActiveChart] = useState<DashboardWidgetPropsChart>(
    props.tabs[0].charts[0]
  );

  const hashMap = useMap<DashboardWidgetPropsChart, string>();
  const dataMap = useMap<DashboardWidgetPropsChart, any>();
  const previousDataMap = useMap<DashboardWidgetPropsChart, any>();
  const loadingMap = useMap<DashboardWidgetPropsChart, boolean>();
  const errorMap = useMap<DashboardWidgetPropsChart, boolean>();
  const fetchHash = useRef("");

  console.log(props.tabs);

  const fetchDataForChart = useCallback(
    async (chart: DashboardWidgetPropsChart, force = false) => {
      if (chart.query?.selectFromData && !props.data) {
        loadingMap.set(chart, true);

        return;
      }

      if (chart.query?.selectFromData && !force) {
        dataMap.set(chart, chart.query.selectFromData(props.data));

        if (props.previousData) {
          previousDataMap.set(
            chart,
            chart.query.selectFromData(props.previousData)
          );
        }

        loadingMap.set(chart, false);
        return;
      }

      const hash = hashMap.get(chart);

      const newHash = JSON.stringify({
        state,
        query: chart.query?.document,
        filter: props.filter,
      });

      if (hash === newHash) {
        return;
      }

      hashMap.set(chart, newHash);

      if (chart.query) {
        const variables =
          typeof chart.query.variables === "function"
            ? chart.query.variables(props.filter, state)
            : chart.query.variables;

        const hash = JSON.stringify({
          document: chart.query.document,
          filter: props.filter,
          variables,
        });

        if (fetchHash.current !== hash || force) {
          fetchHash.current = hash;

          loadingMap.set(chart, true);

          try {
            if (!chart.query.document && !chart.query.selectFromData) {
              loadingMap.set(chart, false);
              return;
            }

            const queryVariables = merge(
              JSON.parse(
                JSON.stringify({
                  filter: props.filter,
                })
              ),
              variables
            );

            if (chart.query.document) {
              let isLessThenOrEqualThenTwoWeeksAgo = false;

              if (queryVariables?.filter?.observedAt_GTEQ) {
                const observedAt = new Date(
                  queryVariables.filter.observedAt_GTEQ
                );

                const twoWeeksAgo = new Date();
                twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

                isLessThenOrEqualThenTwoWeeksAgo = observedAt >= twoWeeksAgo;
              }

              const data = await fetcher(
                chart.query.document,
                queryVariables
              )();

              if (chart.query.select) {
                dataMap.set(
                  chart,
                  await chart.query.select(data, queryVariables, props.data)
                );
              } else if (chart.query.dataPath) {
                if (chart.query.dataPath.startsWith("$")) {
                  dataMap.set(chart, jp.query(data, chart.query.dataPath));
                } else {
                  dataMap.set(chart, get(data, chart.query.dataPath));
                }
              } else {
                dataMap.set(chart, data);
              }

              loadingMap.set(chart, false);

              if (isLessThenOrEqualThenTwoWeeksAgo) {
                const gteq = queryVariables.filter.observedAt_GTEQ;
                const lteq =
                  queryVariables.filter.observedAt_LTEQ ??
                  new Date().toISOString();

                const diff =
                  new Date(lteq).getTime() - new Date(gteq).getTime();

                const newGteq = new Date(
                  new Date().setTime(new Date(gteq).getTime() - diff)
                ).toISOString();
                const newLteq = new Date(
                  new Date().setTime(new Date(lteq).getTime() - diff)
                ).toISOString();

                const previousData = await fetcher(chart.query.document, {
                  ...queryVariables,
                  filter: {
                    ...queryVariables.filter,
                    observedAt_GTEQ: newGteq,
                    observedAt_LTEQ: newLteq,
                  },
                })();

                if (chart.query.select) {
                  previousDataMap.set(
                    chart,
                    await chart.query.select(
                      previousData,
                      {
                        ...queryVariables,
                        filter: {
                          ...queryVariables.filter,
                          observedAt_GTEQ: newGteq,
                          observedAt_LTEQ: newLteq,
                        },
                      },
                      props.data
                    )
                  );
                } else if (chart.query.dataPath) {
                  if (chart.query.dataPath.startsWith("$")) {
                    previousDataMap.set(
                      chart,
                      jp.query(previousData, chart.query.dataPath)
                    );
                  } else {
                    previousDataMap.set(
                      chart,
                      get(previousData, chart.query.dataPath)
                    );
                  }
                } else {
                  previousDataMap.set(chart, previousData);
                }
              }
            } else if (chart.query.selectFromData) {
              if (!props.data) {
                hashMap.set(chart, "");
                return;
              }

              dataMap.set(chart, chart.query.selectFromData(props.data));

              if (props.previousData) {
                previousDataMap.set(
                  chart,
                  chart.query.selectFromData(props.previousData)
                );
              }
            }
          } catch (err) {
            console.error(err);
            errorMap.set(chart, true);
            loadingMap.set(chart, false);
          }
        }
      }
    },
    [props.data, props.previousData, state]
  );

  useEffect(() => {
    setActiveTab(props.tabs[0]);
  }, [props.tabs]);

  useEffect(() => {
    if (activeTab) {
      setActiveChart(activeTab.charts[0]);
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeChart) {
      fetchDataForChart(activeChart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.filter, state, props.previousData]);

  useEffect(() => {
    if (activeChart) {
      fetchDataForChart(activeChart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChart, activeTab, props.previousData]);

  const isTabActive = (tab: DashboardWidgetPropsTab) => tab === activeTab;

  const activateTab = (tab: DashboardWidgetPropsTab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  // const activateChart = (chart: DashboardWidgetPropsChart) => {
  //   if (chart !== activeChart) {
  //     setActiveChart(chart);
  //   }
  // };

  const hasHeader = useMemo(() => {
    return props.tabs.length > 1 || props.tabs[0].title;
  }, [props.tabs]);

  return (
    <div
      className={classNames(
        styles.container,
        !hasHeader && styles.withoutHeader,
        {
          [styles[activeChart?.type ?? ""]]: true,
        }
      )}
      style={{
        gridColumn: `span ${props.span ?? 3}`,
      }}
    >
      {hasHeader && (
        <div className={styles.header}>
          {props.tabs.length > 1 ? (
            <div className={classNames(styles.tabs)}>
              {props.tabs.map((tab, i) => (
                <div
                  key={i}
                  onClick={() => activateTab(tab)}
                  className={classNames(styles.tab, {
                    [styles.active]: isTabActive(tab),
                  })}
                >
                  <span className={styles.title}>
                    {typeof tab.title === "function" ? (
                      tab.title(null)
                    ) : (
                      <Tooltip
                        text={tab.title}
                        truncated
                        popupStyle={{
                          padding:
                            "var(--gutter-extra-small) var(--gutter-small)",
                        }}
                        position={TooltipPosition.Bottom}
                      >
                        {tab.title}
                      </Tooltip>
                    )}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div
              className={classNames(styles.title, {
                [styles.disabled]: !activeChart?.query,
              })}
            >
              {typeof props.tabs[0].title === "function"
                ? props.tabs[0].title(
                    activeChart ? dataMap.get(activeChart) : null
                  )
                : props.tabs[0].title}
            </div>
          )}
          {!!activeTab?.renderActions && (
            <div className={styles.actions}>
              {activeTab.renderActions(
                props.filter,
                dataMap.get(activeChart),
                state,
                setState
              )}
            </div>
          )}
        </div>
      )}
      <div className={styles.content}>
        <Loader
          className={styles.loader}
          visible={activeChart ? !!loadingMap.get(activeChart) : true}
        />
        <Error
          style={{ zIndex: 399 }}
          apiError={activeChart ? !!errorMap.get(activeChart) : null}
          onTryAgain={() => fetchDataForChart(activeChart!, true)}
          compact={true}
        />
        {!!activeChart?.query &&
          dataMap.has(activeChart) &&
          !errorMap.has(activeChart) &&
          CHART_RENDERERS[activeChart.type](
            activeChart,
            dataMap.get(activeChart),
            previousDataMap.get(activeChart),
            props.filter,
            state,
            () =>
              activeTab.renderColumnActions?.(
                props.filter,
                dataMap.get(activeChart),
                state,
                setState
              )
          )}
        {activeChart && !activeChart?.query && (
          <DashboardWidgetChartEmpty type={activeChart.type} />
        )}
      </div>
    </div>
  );
};

export default DashboardWidget;
export * from "./Widget.types";
