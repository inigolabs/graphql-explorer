import "./Copy.scss";
import Tooltip from "../Tooltip/Tooltip";
import { useCallback, useMemo, useState } from "react";
import Icon, { Clipboard } from "../Icon/Icon";
import { TooltipPosition } from "../Tooltip/Tooltip.types";

interface ICopyProps {
  value: string;
  label?: string;
  text?: string;
  children?: React.ReactNode;
  styles?: React.CSSProperties;
  tooltipPosition?: TooltipPosition;
  iconSize?: {
    width: number;
    height: number;
  };
  onCopy?: () => void;
}

function Copy(props: ICopyProps) {
  const [copyTextState, setCopyTextState] = useState("Copy");

  const onClick = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      ev.stopPropagation();

      setCopyTextState("Copied");
      navigator.clipboard.writeText(props.value);

      if (props.onCopy) {
        props.onCopy();
      }
    },
    [props.value, props.onCopy]
  );

  const onMouseLeave = useCallback(() => {
    setTimeout(() => setCopyTextState("Copy"), 300);
  }, [copyTextState]);

  let tooltipText = useMemo(() => {
    if (copyTextState !== "Copied") {
      if (props.label) {
        return "";
      }

      return props.text;
    }

    return copyTextState;
  }, [copyTextState, props.label]);

  return (
    <div className="CopyComponentWrapper">
      <Tooltip
        style={{
          flex: 1,
          minWidth: "100%",
        }}
        position={props?.tooltipPosition}
        text={tooltipText}
        popupStyle={{
          padding: "var(--gutter-extra-small) var(--gutter-small)",
        }}
      >
        {props.children ? (
          <button
            className="CopyComponentFakeButton"
            onClick={onClick}
            onMouseLeave={onMouseLeave}
          >
            {props.children}
          </button>
        ) : (
          <button
            onClick={onClick}
            onMouseLeave={onMouseLeave}
            className="CopyComponentButton"
            style={{
              ...(props.styles && {
                ...props.styles,
              }),
            }}
          >
            <Icon
              size={props?.iconSize ?? { width: 14.5, height: 15.5 }}
              icon={<Clipboard />}
            />

            {props.label}
          </button>
        )}
      </Tooltip>
    </div>
  );
}

export default Copy;
