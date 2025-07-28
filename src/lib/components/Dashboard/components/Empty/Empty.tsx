import styles from "./Empty.module.css";

import { useMemo, useState } from "react";
import classNames from "classnames";

import { DashboardWidgetPropsChartType } from "../Widget/Widget.types";
import { EmptyProps } from "./Empty.types";
import { useWindowSize } from "../../../../utils/helpers";
import useMediaQuery from "../../../../utils/useMediaQuery";

const DashboardWidgetChartEmpty = (props: EmptyProps) => {
  const windowSize = useWindowSize();
  const mediaQuery = useMediaQuery("screen and (min-height: 1000px)");
  const [blockChartContainer, setBlockChartContainer] =
    useState<HTMLDivElement | null>(null);

  const blockChartSegmentsCount = useMemo(() => {
    if (blockChartContainer) {
      const containerWidth = blockChartContainer.clientWidth;
      const segmentWidth = 20;

      return Math.floor(containerWidth / segmentWidth);
    }
    return 0;
  }, [windowSize.width, blockChartContainer]);

  if (props.type === DashboardWidgetPropsChartType.Pie) {
    return (
      <div className={classNames(styles.Container, styles.PieContainer)}>
        <div className={styles.Pie}>
          <div className={styles.Inner}>No data yet</div>
        </div>
        <div className={styles.Legend}>
          {props.legend?.map((item, i) => (
            <div key={i} className={styles.Item}>
              <div className={styles.Color}></div>
              <div className={styles.Label}>{item}</div>
              <div className={styles.Value}>-</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (props.type === DashboardWidgetPropsChartType.List) {
    return (
      <div className={classNames(styles.Container, styles.ListContainer)}>
        <div className={styles.List}>
          {Array.from({ length: mediaQuery ? 20 : 10 })
            .map((_, i) => {
              return mediaQuery ? 100 - i * 5 : 100 - i * 10;
            })
            .map((value, i, arr) => {
              const maxBar = Math.max(...arr);
              const isLast = i === arr.length - 1;

              return (
                <div
                  key={i}
                  className={styles.barContainer}
                  style={{ pointerEvents: "none" }}
                >
                  <div
                    className={styles.bar}
                    style={{
                      width: `${(value / maxBar) * 100}%`,
                    }}
                  >
                    {isLast && (
                      <div className={styles.barItemInfo}>
                        <div className={styles.emptyMessage}>No data yet</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  if (props.type === DashboardWidgetPropsChartType.Bar) {
    return (
      <div className={classNames(styles.Container, styles.BarContainer)}>
        <div className={styles.Bars}>
          <div className={styles.Bar} style={{ width: "100%" }}></div>
          <div className={styles.Bar} style={{ width: "90%" }}></div>
          <div className={styles.Bar} style={{ width: "70%" }}></div>
          <div className={styles.Bar} style={{ width: "60%" }}></div>
          <div className={styles.Bar} style={{ width: "50%" }}></div>
          <div className={styles.Bar} style={{ width: "40%" }}></div>
          <div className={styles.Bar} style={{ width: "30%" }}></div>
          <div className={styles.Bar} style={{ width: "20%" }}></div>
          <div className={styles.Bar} style={{ width: "10%" }}></div>
          <div className={styles.Bar} style={{ width: "0%" }}></div>
        </div>
        No data yet
      </div>
    );
  }

  if (props.type === DashboardWidgetPropsChartType.Block) {
    return (
      <div
        className={classNames(styles.Container, styles.BlockContainer)}
        ref={setBlockChartContainer}
      >
        <div className={styles.Blocks}>
          {Array.from({ length: blockChartSegmentsCount }).map((_, i) => (
            <div
              key={i}
              className={styles.Block}
              style={{ height: "100%" }}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default DashboardWidgetChartEmpty;
export * from "./Empty.types";
