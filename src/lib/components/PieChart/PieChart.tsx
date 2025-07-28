import styles from "./PieChart.module.css";

import { useCallback, useEffect, useState } from "react";
import * as Recharts from "recharts";
import classNames from "classnames";
import { jsx, renderBigNumber, renderEnumValue } from "../../utils/helpers";

import {
  PieChartData,
  PieChartProps,
  PieChartTooltipProps,
} from "./PieChart.types";
import DashboardWidgetChartEmpty from "../Dashboard/components/Empty/Empty";
import { DashboardWidgetPropsChartType } from "../Dashboard/Dashboard";
import Tooltip from "../Tooltip/Tooltip";
import { shortNumber } from "../../utils/shortNumber";
import { Link } from "react-router-dom";

const COLORS = [
  "var(--color-coverage-calls)",
  "#E7B3E2",
  "#B3E8E2",
  "#00B19D",
  "#AFBB80",
  "#7B1DC5",
  "#FCE3D0",
  "#A99FBE",
  "#5F7700",
  "#80B7B1",
  "#FFA5F6",
  "#BB9880",
  "#8097C5",
  "#CDA5FF",
  "var(--color-chart-1)",
  "#533F7E",
  "var(--color-coverage-counts)",
  "#D8E6FF",
  "#338C82",
  "#D6C2B3",
  "#3359A1",
  "#FCB3C9",
  "#D880CF",
  "#B77EFF",
  "#CFD6B3",
  "#B0009F",
  "#F7A062",
];

const PieChartTooltip = (props: PieChartTooltipProps) => {
  return (
    <div className={classNames(styles.Tooltip, "dark", "TooltipPopupContent")}>
      <span className={styles.Title}>
        {renderEnumValue(props.payload?.[0]?.payload.errorMessage)}
      </span>
      <table className={styles.Table}>
        <tbody>
          <tr>
            <td>Count:</td>
            <td>{renderBigNumber(props.payload?.[0]?.payload?.totalCount)}</td>
          </tr>
          <tr>
            <td>Out of total:</td>
            <td>
              {(
                (props.payload?.[0]?.payload?.totalCount / props.total) *
                100
              ).toFixed(2)}
              %
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const ActiveShape = (props: any) => {
  return (
    <g>
      <Recharts.Sector
        cx={props.cx}
        cy={props.cy}
        innerRadius={props.innerRadius}
        outerRadius={props.outerRadius + 5}
        startAngle={props.startAngle}
        endAngle={props.endAngle}
        fill={props.fill}
      />
    </g>
  );
};

const PieChart = (props: PieChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number>();
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    setTotalCount(
      (props.data ?? []).reduce(
        (acc, entry) => acc + (entry[props.dataKey] ?? 0),
        0
      )
    );
  }, [props.data, props.dataKey]);

  const onMouseEnter = useCallback((data: PieChartData, index: number) => {
    setActiveIndex(index);
  }, []);

  const onMouseLeave = useCallback((data: PieChartData, index: number) => {
    setActiveIndex(undefined);
  }, []);

  // const onLegendClick = useCallback(
  //   (item: PieChartData[0]) => {
  //     if (props.legend?.onClick) {
  //       props.legend?.onClick(item);
  //     }
  //   },
  //   [props.legend]
  // );

  if (!props.data) {
    return null;
  }

  const isEmpty = !totalCount;
  const emptyData = props.emptyData ?? [];

  const getData = () => {
    if (isEmpty && emptyData) {
      return emptyData;
    }

    return props.data;
  };

  const total = isEmpty
    ? emptyData?.reduce((acc, entry) => acc + (entry[props.dataKey] ?? 0), 0)
    : totalCount;

  const data = getData();

  const size = props.size ?? 205;
  const sortedData = [...data].sort((x, y) =>
    x[props.dataKey] > y[props.dataKey] ? -1 : 1
  );

  if (isEmpty) {
    return (
      <DashboardWidgetChartEmpty
        type={DashboardWidgetPropsChartType.Pie}
        legend={
          props.legend?.labelKey
            ? emptyData.map((item) => item[props.legend!.labelKey])
            : undefined
        }
      />
    );
  }

  return (
    <div
      className={classNames(
        styles.Container,
        { [styles.Empty]: isEmpty },
        props.className
      )}
    >
      <div className={classNames(styles.Chart)}>
        <Recharts.PieChart width={size} height={size}>
          <Recharts.Pie
            activeIndex={isEmpty ? undefined : activeIndex}
            activeShape={isEmpty ? undefined : ActiveShape}
            data={sortedData}
            dataKey={props.dataKey}
            cx="50%"
            cy="50%"
            innerRadius={size / 2 - 5 - 25}
            outerRadius={size / 2 - 5}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            animationBegin={0}
            animationEasing={"ease-out"}
            animationDuration={300}
            startAngle={-270}
            endAngle={-630}
            paddingAngle={sortedData.length > 1 ? 1 : 0}
          >
            {sortedData.map((entry: any, index: any) => (
              <Recharts.Cell
                key={`cell-${index}`}
                stroke={isEmpty ? "var(--color-divider-primary)" : "#FFFFFF"}
                strokeWidth={isEmpty ? 1 : 0}
                fill={isEmpty ? "#f6f8fa" : COLORS[index % COLORS.length]}
              />
            ))}
          </Recharts.Pie>
          {!isEmpty && (
            <Recharts.Tooltip
              content={(tooltipProps) => (
                <PieChartTooltip {...tooltipProps} total={total} />
              )}
              position={{ x: 218 }}
            />
          )}
        </Recharts.PieChart>
        <div className={styles.Count}>
          <div className={styles.Value}>
            {isEmpty ? 0 : shortNumber(totalCount)}
          </div>
          <div className={styles.Label}>{props.label}</div>
        </div>
      </div>
      {jsx.if(props.legend, () => {
        return (
          <div className={styles.Legend}>
            <div className={styles.List}>
              <div className={styles.Column}>
                {sortedData.map((item, index) => (
                  <div className={styles.Row} key={index}>
                    <div
                      className={styles.Color}
                      style={{
                        border: isEmpty
                          ? "1px solid var(--color-divider-primary)"
                          : undefined,
                        backgroundColor: isEmpty
                          ? "#f6f8fa"
                          : COLORS[index % COLORS.length],
                      }}
                    ></div>
                    <Link
                      className={styles.Label}
                      to={props.legend?.computeHref?.(item) ?? ""}
                    >
                      <Tooltip
                        text={renderEnumValue(item[props.legend!.labelKey])}
                        truncated
                        popupStyle={{ width: 480, whiteSpace: "normal" }}
                      >
                        {renderEnumValue(item[props.legend!.labelKey])}
                      </Tooltip>
                    </Link>
                    <div className={styles.Value}>
                      {isEmpty
                        ? "--"
                        : `${shortNumber(item[props.dataKey])} / ${(
                            (item[props.dataKey] / total) *
                            100
                          ).toFixed(2)}%`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default PieChart;
export * from "./PieChart.types";
