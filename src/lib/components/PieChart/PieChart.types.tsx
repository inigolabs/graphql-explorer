import * as Recharts from 'recharts';

export interface PieChartTooltipProps extends Recharts.TooltipProps<any, any> {
  total: number;
}

export type PieChartData = Record<string, any>[];

export interface PieChartLegend {
  labelKey: string;
  onClick?: (item: PieChartData[0]) => void;
  computeHref?: (value: any, ...args: any) => string;
}

export interface PieChartProps {
  className?: string;
  label?: string;
  size?: number;
  data: Record<string, any>[];
  emptyData?: Record<string, any>[];
  dataKey: string;
  legend?: PieChartLegend;
}
