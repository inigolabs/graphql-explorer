import classNames from "classnames";
import { useEffect, useState } from "react";

import Button, { ButtonSize } from "../Buttons/Button";

import Icon, { Close } from "../Icon/Icon";
import Tooltip, { TooltipPosition } from "../Tooltip/Tooltip";
import styles from "./Drawer.module.css";
import { DrawerProps } from "./Drawer.types";

// million-ignore
const Drawer = (props: DrawerProps) => {
  const [fullWidth, setFullWidth] = useState(false);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (props.visible) {
        const drawer = document.querySelector(`.${styles.drawer}`);

        if (drawer) {
          if (e.composedPath().includes(drawer)) return;
        }

        props.onClose?.();
      }
    }

    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        props.onClose?.();
      }
    }

    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKeydown);

    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKeydown);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onClose, props.visible]);

  return (
    <div
      className={classNames(styles.drawer, {
        [styles.visible]: props.visible,
        [styles.fullWidth]: fullWidth,
      })}
      style={props.style}
    >
      <div
        className={styles.content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.header}>
          <div className={styles.title}>
            <Tooltip
              text={fullWidth ? "Exit full screen" : "Go to full screen"}
              popupStyle={{
                padding: "var(--gutter-extra-small) var(--gutter-small)",
              }}
              position={TooltipPosition.Bottom}
            >
              <Button
                onClick={() => setFullWidth((prev) => !prev)}
                size={ButtonSize.Small}
                icon
              >
                <Icon
                  className={classNames(styles.icon, {
                    [styles.expanded]: fullWidth,
                  })}
                  icon={
                    <>
                      <g clip-path="url(#clip0_28876_10848)">
                        <path
                          d="M5.66797 1.39062V14.6128M11.1124 10.3351L8.77908 8.00174L11.1124 5.6684"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1 5.97778C1 4.23556 1 3.36444 1.33911 2.69867C1.63738 2.1133 2.1133 1.63738 2.69867 1.33911C3.36444 1 4.23556 1 5.97778 1H10.0222C11.7644 1 12.6356 1 13.3013 1.33911C13.8867 1.63738 14.3626 2.1133 14.6609 2.69867C15 3.36444 15 4.23556 15 5.97778V10.0222C15 11.7644 15 12.6356 14.6609 13.3013C14.3626 13.8867 13.8867 14.3626 13.3013 14.6609C12.6356 15 11.7644 15 10.0222 15H5.97778C4.23556 15 3.36444 15 2.69867 14.6609C2.1133 14.3626 1.63738 13.8867 1.33911 13.3013C1 12.6356 1 11.7644 1 10.0222V5.97778Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_28876_10848">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </>
                  }
                  size={16}
                />
              </Button>
            </Tooltip>
            <Tooltip text={props.title} truncated>
              {props.title}
            </Tooltip>
          </div>
          {props.description && (
            <div className={styles.description}>{props.description}</div>
          )}
          <div className={styles.actions}>
            {props.actions}
            <div className={styles.close} onClick={props.onClose}>
              <Icon icon={<Close />} size={16} />
            </div>
          </div>
        </div>
        <div className={classNames(styles.body, props.bodyClassName)}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
