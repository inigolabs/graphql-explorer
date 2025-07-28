import { LineChartLine } from "../../../LineChart/LineChart.types";
import { PieChartData, PieChartLegend } from "../../../PieChart/PieChart.types";
import { BarChartAxis, BarChartBar } from "../../../BarChart/BarChart.types";
import {
  ListChartColumn,
  ListChartProps,
} from "../../../ListChart/ListChart.types";

export interface DashboardWidgetPropsQuery {
  document?: string;
  dataPath?: string;
  select?: (
    data: any,
    variables: Record<string, any>,
    globalData?: any
  ) => any | Promise<any>;
  selectFromData?: (data?: any) => any;
  variables?:
    | Record<string, any>
    | ((filter: any, state: Record<string, any>) => Record<string, any>);
}

export enum DashboardWidgetPropsChartType {
  Line = "line",
  Bar = "bar",
  Pie = "pie",
  List = "list",
  Block = "block",
  Count = "count",
}

export interface DashboardWidgetPropsChart<ChartOptions = Record<string, any>> {
  type: DashboardWidgetPropsChartType;
  query?: DashboardWidgetPropsQuery;
  cache?: Record<string, any>;
  options: ChartOptions;
}

export interface DashboardWidgetPropsChartLineOptionsLine {
  color?: string;
  dataPath: string;
}

export interface DashboardWidgetPropsChartBarOptions {
  bars?: BarChartBar[];
  axis?: { x?: BarChartAxis; y?: BarChartAxis };
  label?: string;
  layout?: "horizontal" | "vertical";
  columns?: string[];
  tooltip?: {
    columns?: {
      title: string;
      dataKey: string;
      render?: (value: any) => React.ReactNode;
    }[];
  };
}

export const DashboardBarChart = (
  config: Omit<
    DashboardWidgetPropsChart<DashboardWidgetPropsChartBarOptions>,
    "type"
  >
): DashboardWidgetPropsChart<DashboardWidgetPropsChartBarOptions> => ({
  type: DashboardWidgetPropsChartType.Bar,
  ...config,
});

export interface DashboardWidgetPropsChartListOptions
  extends Omit<ListChartProps, "data"> {}

export const DashboardListChart = (
  config: Omit<
    DashboardWidgetPropsChart<DashboardWidgetPropsChartListOptions>,
    "type"
  >
): DashboardWidgetPropsChart<DashboardWidgetPropsChartListOptions> => ({
  type: DashboardWidgetPropsChartType.List,
  ...config,
});

interface DashboardWidgetPropsChartPieOptionsLegend
  extends Omit<PieChartLegend, "onClick"> {
  // onClick: (item: PieChartData[0], filter: any) => void;
}

export interface DashboardWidgetPropsChartPieOptions {
  dataKey: string;
  size?: number;
  label?: string;
  emptyData?: Record<string, any>[];
  legend?: DashboardWidgetPropsChartPieOptionsLegend;
}

export const DashboardPieChart = (
  config: Omit<
    DashboardWidgetPropsChart<DashboardWidgetPropsChartPieOptions>,
    "type"
  >
): DashboardWidgetPropsChart<DashboardWidgetPropsChartPieOptions> => ({
  type: DashboardWidgetPropsChartType.Pie,
  ...config,
});

export interface DashboardWidgetPropsChartLineOptions {
  legend?: boolean;
  lines: LineChartLine[];
}

export const DashboardLineChart = (
  config: Omit<
    DashboardWidgetPropsChart<DashboardWidgetPropsChartLineOptions>,
    "type"
  >
): DashboardWidgetPropsChart<DashboardWidgetPropsChartLineOptions> => ({
  type: DashboardWidgetPropsChartType.Line,
  ...config,
});

export interface DashboardWidgetPropsChartCountOptions {
  dataPath: string;
  previousDataPath?: string;
  invert?: boolean;
  renderValue?: (value: any) => React.ReactNode;
  computeHref?: (value: any, ...args: any) => string;
}

export const DashboardCountChart = (
  config: Omit<
    DashboardWidgetPropsChart<DashboardWidgetPropsChartCountOptions>,
    "type"
  >
): DashboardWidgetPropsChart<DashboardWidgetPropsChartCountOptions> => ({
  type: DashboardWidgetPropsChartType.Count,
  ...config,
});

export interface DashboardWidgetPropsTab {
  title?: string | ((data: any) => string);
  renderActions?: (
    filter: any,
    data: any,
    state: Record<string, any>,
    setState: (v: Record<string, any>) => void
  ) => React.ReactNode;
  renderColumnActions?: (
    filter: any,
    data: any,
    state: Record<string, any>,
    setState: (v: Record<string, any>) => void
  ) => React.ReactNode;
  charts: DashboardWidgetPropsChart[];
}

export interface DashboardWidgetProps {
  filter: Record<string, any>;
  tabs: DashboardWidgetPropsTab[];
  span?: number;
  data?: any;
  previousData?: any;
  defaultState?: Record<string, any>;
}
