import * as Recharts from 'recharts';

export interface BarChartBar {
  dataKey: string;
  extraDataKeys?: {
    dataKey: string;
    renderValue?: (value: any, data: any) => React.ReactNode;
  }[];
  color?: string;
  renderValue?: (value: any, data: any) => React.ReactNode;
  computeHref?: (value: any, ...args: any) => string;
}

export interface BarChartTooltipProps extends Recharts.TooltipProps<any, any> {
  columns: {
    title: string;
    dataKey: string;
    render?: (value: any) => React.ReactNode;
  }[];
  data?: Record<string, any>;
}

export interface BarChartAxis {
  dataKey?: string;
  computeHref?: (value: any, ...args: any) => string;
  type?: 'category' | 'number';
  render?: (value: any) => React.ReactNode;
}

export interface BarChartProps {
  className?: string;
  label?: string;
  xAxisDataKey?: string;
  yAxisDataKey?: string;
  columns?: [string, string];
  data: Record<string, any>[];
  bars?: BarChartBar[];
  axis?: { x?: BarChartAxis; y?: BarChartAxis };
  layout?: 'horizontal' | 'vertical';
  tooltip?: {
    columns?: {
      title: string;
      dataKey: string;
    }[];
  };
  renderActions?: () => React.ReactNode;
  compactEmptyState?: boolean;
  emptyMessage?: string;
}
