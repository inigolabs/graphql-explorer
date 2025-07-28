import styles from "./BarChart.module.css";

import classNames from "classnames";

import { BarChartProps, BarChartTooltipProps } from "./BarChart.types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { renderBigNumber } from "../../utils/helpers";
import { Link } from "react-router-dom";
import Tooltip, { TooltipPosition } from "../Tooltip/Tooltip";
import useMediaQuery from "../../utils/useMediaQuery";
import Icon, { ArrowRight, IconGraph } from "../Icon/Icon";
import Button, { ButtonSize } from "../Buttons/Button";

// million-ignore
const BarChartTooltip = (props: BarChartTooltipProps) => {
  return (
    <div className={classNames(styles.Tooltip, "TooltipPopupContent")}>
      <table className={styles.Table}>
        <tbody>
          {props.columns.map((column, i) => {
            let value = props.data?.[column.dataKey];

            if (column.render) {
              value = column.render(value);
            } else if (typeof value === "number") {
              value = renderBigNumber(value);
            }

            return (
              <tr>
                <td key={i}>{column.title}:</td>
                <td key={i}>{value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const BarChart = (props: BarChartProps) => {
  const barsRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const mediaQuery = useMediaQuery("screen and (min-height: 1000px)");

  const data = useMemo(() => {
    if (props.data?.length) {
      return props.data.filter((item) => {
        const bars = (props.bars ?? []).map(
          (bar) => item[bar.dataKey] as number
        );

        return bars.some((bar) => bar > 0);
      });
    }

    return [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  const [tooltipBar, setTooltipBar] = useState<(typeof props.data)[0] | null>(
    null
  );

  const max = useMemo(
    () =>
      (data ?? []).reduce((acc, item) => {
        const bars = (props.bars ?? []).map(
          (bar) => item[bar.dataKey] as number
        );

        return Math.max(acc, ...bars);
      }, 0),
    [data, props.bars]
  );

  useEffect(() => {
    if (tooltipBar) {
      const tooltipEl = tooltipRef.current;
      const barsEl = barsRef.current;

      if (tooltipEl && barsEl) {
        let cachedTransition: string | null = null;

        if (Number.parseInt(getComputedStyle(tooltipEl).left, 10) === 0) {
          cachedTransition = getComputedStyle(tooltipEl).transition;
          tooltipEl.style.transition = "none";
        }

        const barsEls = barsEl.querySelectorAll(`.${styles.barWrapper}`);

        if (barsEls.length > 0) {
          const barEl = barsEls[data.indexOf(tooltipBar)] as HTMLElement;

          if (barEl) {
            const tooltipRect = tooltipEl.getBoundingClientRect();
            const barRect = barEl.getBoundingClientRect();

            if (barRect.right + tooltipRect.width > window.innerWidth) {
              tooltipEl.className = classNames(
                styles.FloatingTooltip,
                styles.Right
              );
              tooltipEl.style.left = `${barRect.left - tooltipRect.width}px`;
            } else {
              tooltipEl.className = classNames(
                styles.FloatingTooltip,
                styles.Left
              );
              tooltipEl.style.left = `${barRect.right}px`;
            }

            tooltipEl.style.top = `${barRect.top + barRect.height / 2}px`;
            tooltipEl.style.opacity = "1";
          }
        }

        if (cachedTransition) {
          setTimeout(() => {
            if (tooltipEl && cachedTransition) {
              tooltipEl.style.transition = cachedTransition;
            }
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tooltipBar, data]);

  const [expandedBars, setExpandedBars] = useState<Record<string, any>[]>([]);

  const renderBar = useCallback(
    (item: Record<string, any>, i: number, isChild?: boolean) => {
      const maxBar = (props.bars ?? []).reduce((acc, bar) => {
        return Math.max(acc, item[bar.dataKey] as number);
      }, 0);

      const href =
        props.bars?.[0].computeHref?.(item[props.bars?.[0].dataKey], item) ??
        "";

      const innerNode = (
        <div className={styles.barWrapper}>
          <div
            key={i}
            className={styles.bar}
            style={
              props.layout === "vertical"
                ? { width: `${(maxBar / max) * 100}%` }
                : { height: `${(maxBar / max) * 100}%` }
            }
          >
            {props.bars?.map((bar, j) => {
              const title = props.axis!.y?.render
                ? props.axis!.y?.render(item[props.axis!.y!.dataKey!] ?? " ")
                : item[props.axis!.y!.dataKey!] ?? " ";

              const value = bar.renderValue
                ? bar.renderValue(item[bar.dataKey] ?? " ", item)
                : item[bar.dataKey] ?? " ";

              return (
                <div
                  key={j}
                  className={classNames(styles.barItem)}
                  style={{
                    flexGrow: item[bar.dataKey] as number,
                    minWidth: item[bar.dataKey] ? "8px" : "0",
                  }}
                >
                  <div
                    className={styles.barItemInfo}
                    style={{
                      gridTemplateColumns: `2.5fr repeat(${
                        (props.columns?.length || 2) - 1
                      }, 1fr)`,
                    }}
                  >
                    <div
                      className={classNames(styles.barItemValue, {
                        [styles.hasChildren]: !!item.__children?.length,
                      })}
                      onClick={(e) => {
                        if (!item.__children?.length) {
                          return;
                        }

                        e.stopPropagation();
                        e.preventDefault();

                        setExpandedBars((prev) =>
                          prev.includes(item)
                            ? prev.filter((i) => i !== item)
                            : [...prev, item]
                        );
                      }}
                    >
                      {!!item.__children?.length && (
                        <div className={styles.barItemArrow}>
                          <Icon icon={<ArrowRight />} size={12} />
                        </div>
                      )}
                      <div className={styles.barItemLabel}>
                        <Tooltip
                          text={title}
                          truncated
                          popupStyle={{ padding: "var(--gutter-extra-small)" }}
                          style={{
                            width: "100%",
                            overflow: "hidden",
                          }}
                        >
                          {title}
                        </Tooltip>
                      </div>
                      {!!item.__children?.length && (
                        <Link
                          className={classNames("Link", styles.more)}
                          to={href}
                        >
                          <Tooltip
                            text="Observe"
                            popupStyle={{
                              padding:
                                "var(--gutter-extra-small) var(--gutter-small)",
                            }}
                            position={TooltipPosition.Bottom}
                          >
                            <Button
                              size={ButtonSize.Small}
                              icon
                              style={{
                                height: 22,
                                width: 22,
                              }}
                            >
                              <Icon icon={<IconGraph />} size={16} />
                            </Button>
                          </Tooltip>
                        </Link>
                      )}
                    </div>
                    {bar.extraDataKeys?.map((extraDataKey, k) => {
                      const extraValue = extraDataKey.renderValue
                        ? extraDataKey.renderValue(
                            item[extraDataKey.dataKey] ?? " ",
                            item
                          )
                        : item[extraDataKey.dataKey] ?? " ";

                      return (
                        <div key={k} className={styles.barItemValue}>
                          {extraValue}
                        </div>
                      );
                    })}
                    <div className={styles.barItemValue}>{value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

      if (!href || item.__children?.length) {
        return (
          <div
            className={classNames(styles.barHolder, {
              [styles.expanded]: expandedBars.includes(item),
            })}
            key={i}
          >
            <div
              key={i}
              className={styles.barContainer}
              onMouseEnter={() => setTooltipBar(item)}
              // onClick={() => props.bars?.[0].onClick?.(item[props.bars?.[0].dataKey], item)}
            >
              {innerNode}
            </div>
            {!!item.__children?.length && (
              <div className={styles.barChildrenContainer}>
                <div className={styles.barChildren}>
                  {item.__children.map((item: Record<string, any>, i: number) =>
                    renderBar(item, i, true)
                  )}
                </div>
              </div>
            )}
          </div>
        );
      }

      return (
        <div
          className={classNames(styles.barHolder, {
            [styles.expanded]: expandedBars.includes(item),
          })}
          key={i}
        >
          <Link
            className={styles.barContainer}
            onMouseEnter={() => setTooltipBar(item)}
            // onClick={() => props.bars?.[0].onClick?.(item[props.bars?.[0].dataKey], item)}
            to={href}
          >
            {innerNode}
          </Link>
          {!!item.__children?.length && (
            <div className={styles.barChildrenContainer}>
              <div className={styles.barChildren}>
                {item.__children.map((item: Record<string, any>, i: number) =>
                  renderBar(item, i, true)
                )}
              </div>
            </div>
          )}
        </div>
      );
    },
    [data, props.bars, props.layout, max, expandedBars]
  );

  return (
    <div
      className={classNames(
        styles.container,
        styles[props.layout ?? "horizontal"],
        props.className
      )}
    >
      <div className={styles.chart}>
        {!!props.columns && (
          <div
            className={styles.header}
            style={{
              gridTemplateColumns: `2.5fr repeat(${
                (props.columns?.length || 2) - 1
              }, 1fr)`,
            }}
          >
            <div className={styles.item}>
              {props.columns[0]} {props.renderActions?.()}
            </div>
            {props.columns.slice(1).map((column, i) => (
              <div key={i} className={styles.item}>
                {column}
              </div>
            ))}
          </div>
        )}
        <div className={styles.inner}>
          <div
            className={styles.bars}
            ref={barsRef}
            onMouseLeave={() => setTooltipBar(null)}
          >
            {props.tooltip?.columns && tooltipBar && (
              <div
                className={classNames(styles.Floating, "dark")}
                ref={tooltipRef}
              >
                <div className={styles.FloatingTooltipArrow}></div>
                <BarChartTooltip
                  columns={props.tooltip.columns}
                  data={tooltipBar}
                />
              </div>
            )}
            {data?.length ? (
              data.map((item, i) => renderBar(item, i, false))
            ) : props.compactEmptyState ? (
              <div className={styles.emptyState}>
                {props.emptyMessage ? props.emptyMessage : "No data yet"}
              </div>
            ) : (
              Array.from({ length: mediaQuery ? 20 : 10 })
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
                      <div className={styles.barWrapper}>
                        <div
                          className={styles.bar}
                          style={{
                            width: `${(value / maxBar) * 100}%`,
                          }}
                        >
                          <div
                            className={styles.barItem}
                            style={{
                              flexGrow: value,
                            }}
                          >
                            {isLast && (
                              <div className={styles.barItemInfo}>
                                <div className={styles.emptyMessage}>
                                  No data yet
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
            )}
          </div>
          {/* <div className={styles.xAxis}>
            {ticks.map((tick, i) => (
              <div key={i} className={styles.xAxisTick}>
                {props.axis?.x?.render ? props.axis.x.render(tick) : shortNumber(Math.round(tick))}
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BarChart;
export * from "./BarChart.types";
