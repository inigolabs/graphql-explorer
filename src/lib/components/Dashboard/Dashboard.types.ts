import { Ui_User_GetHomeDataQuery } from '@utils/api';
import { DashboardWidgetProps } from './components/Widget/Widget.types';

export interface DashboardProps {
  widgets: Omit<DashboardWidgetProps, 'filter'>[];
  data?: Ui_User_GetHomeDataQuery;
  previousData?: Ui_User_GetHomeDataQuery;
  style?: React.CSSProperties;
}
