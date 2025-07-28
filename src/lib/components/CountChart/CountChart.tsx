import { get } from "lodash";
import styles from "./CountChart.module.css";
import { shortNumber } from "../../utils/shortNumber";
import { renderBigNumber } from "../../utils/helpers";
import { Link } from "react-router-dom";
import Badge, { BadgeVariant } from "../Badge/Badge";
import Tooltip, { TooltipPosition } from "../Tooltip/Tooltip";

export interface CountChartProps {
  dataPath: string;
  previousDataPath?: string;
  data?: Record<string, any>;
  previousData?: Record<string, any>;
  invert?: boolean;
  computeHref?: (value: any, ...args: any) => string;
  renderValue?: (value: any) => React.ReactNode;
}

export default function CountChart(props: CountChartProps) {
  const value = get(props.data, props.dataPath) || 0;

  let percentageDiff: number | undefined;

  if (props.previousData) {
    const previousValue = get(props.previousData, props.dataPath);
    percentageDiff = previousValue
      ? ((value - previousValue) / previousValue) * 100
      : 100;
  }

  let direction = "up";

  if (percentageDiff) {
    if (percentageDiff > 0) {
      direction = "up";
    } else if (percentageDiff < 0) {
      direction = "down";
    }
  }

  if (props.invert) {
    direction = direction === "up" ? "down" : "up";
  }

  const result = (
    <div className={styles.value}>
      {props.renderValue ? props.renderValue(value) : shortNumber(value)}
      <div
        onClick={(ev) => {
          ev.stopPropagation();
          ev.preventDefault();
        }}
      >
        <Tooltip
          text="Represents the difference in percentage compared to the previous time period window"
          position={TooltipPosition.Bottom}
          popupStyle={{
            padding: "var(--gutter-extra-small) var(--gutter-small)",
          }}
        >
          {!!percentageDiff && (
            <Badge
              className={styles.percentage}
              variant={
                direction === "up" ? BadgeVariant.Success : BadgeVariant.Failed
              }
            >
              {percentageDiff > 0 ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 13L8 3L8 13ZM8 3L12 6.75L8 3ZM8 3L4 6.75L8 3Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8 13L8 3M8 3L12 6.75M8 3L4 6.75"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 3V13V3ZM8 13L4 9.25L8 13ZM8 13L12 9.25L8 13Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8 3V13M8 13L4 9.25M8 13L12 9.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {renderBigNumber(percentageDiff)}%
            </Badge>
          )}
        </Tooltip>
      </div>
    </div>
  );

  if (props.computeHref) {
    return <Link to={props.computeHref(value)}>{result}</Link>;
  }

  return result;
}
