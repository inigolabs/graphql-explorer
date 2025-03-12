import { forwardRef } from "react";
import styles from "./Button.module.css";
import cn from "classnames";
import Tooltip, { TooltipPosition } from "../Tooltip/Tooltip";

export enum ButtonVariant {
  Default = "default",
  Primary = "primary",
  Secondary = "secondary",
  Outline = "outline",
  Text = "text",
  Link = "link",
}

export enum ButtonSize {
  Small = "small",
  Default = "size_default",
  Large = "large",
}

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  disabled?: boolean;
  icon?: boolean;
  style?: React.CSSProperties;
  tooltip?: string;
}

const Button = forwardRef<HTMLDivElement, ButtonProps>((props, ref) => {
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!props.disabled) {
      props.onClick?.(e);
    }
  };

  const innerNode = (
    <div
      ref={ref}
      tabIndex={props.disabled ? -1 : 0}
      className={cn(
        styles.button,
        props.icon && styles.icon,
        styles[props.variant ?? ButtonVariant.Default],
        styles[props.size ?? ButtonSize.Default],
        props.disabled && styles.disabled,
        props.className
      )}
      style={props.style}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
    >
      {props.children}
    </div>
  );

  if (props.tooltip) {
    return (
      <Tooltip
        text={props.tooltip}
        position={TooltipPosition.Bottom}
        popupStyle={{
          padding: "var(--gutter-extra-small) var(--gutter-small)",
        }}
      >
        {innerNode}
      </Tooltip>
    );
  }

  return innerNode;
});

export default Button;
