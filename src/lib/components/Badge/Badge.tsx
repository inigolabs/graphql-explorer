import { forwardRef } from 'react';
import styles from './Badge.module.css';
import cn from 'classnames';

export enum BadgeVariant {
  Default = 'default',
  Failed = 'failed',
  Success = 'success',
  Warning = 'warning',
  Neutral = 'neutral',
  Disabled = 'disabled',
}

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
  return (
    <div
      ref={ref}
      className={cn(styles.Badge, styles[props.variant ?? BadgeVariant.Default], props.className)}
      style={props.style}
    >
      {props.icon && <div className={styles.Icon}>{props.icon}</div>}
      {props.children}
    </div>
  );
});

export default Badge;
