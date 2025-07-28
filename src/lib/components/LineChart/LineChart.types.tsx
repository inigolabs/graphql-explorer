import Recharts from "recharts";

export interface LineChartDotProps extends Recharts.DotProps {
  color: string;
}

export interface LineChartLine {
  label?: string;
  color?: string;
  strokeWidth?: number;
  dataKey: string;
}

export interface LineChartTooltipProps {
  lines: LineChartLine[];
  interval: number;
  point?: Record<string, any>;
  dateVisible?: boolean;
}

export interface LineChartProps {
  disableTooltip?: boolean;
  disableYAxis?: boolean;
  disableXAxis?: boolean;
  enableBorder?: boolean;
  data: {
    segmentCount: number;
    segmentInterval: number;
    timeEnd: string;
    timeStart: string;
    points: Record<string, any>[];
  };
  title?: string;
  legend?: boolean;
  lines: LineChartLine[];
}

export interface LineChartLegendProps {
  onSelect?: (selected: LineChartLine[]) => void;
  lines: LineChartLine[];
  data: LineChartProps["data"];
}
