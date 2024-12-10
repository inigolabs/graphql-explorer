export interface ICalendarProps {
  selected?: string | string[];
  activeIndex?: 0 | 1;
  min?: string;
  max?: string;
  range?: boolean;
  onChange?: (date: string | [string, string]) => void;
  onActiveIndexChange?: (index: 0 | 1) => void;
}
