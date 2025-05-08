export interface DrawerProps {
  title?: string;
  description?: string;
  visible?: boolean;
  onClose?: () => void;
  onShow?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  actions?: React.ReactNode;
  bodyClassName?: string;
  bodyStyle?: React.CSSProperties;
}
