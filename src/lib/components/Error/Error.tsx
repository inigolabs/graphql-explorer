import styles from "./Error.module.css";

import classNames from "classnames";
import Button from "../Button/Button";

interface IErrorProps {
  apiError?: unknown;
  onTryAgain?: () => void;
  style?: React.CSSProperties;
  hideImage?: boolean;
  compact?: boolean;
  className?: string;
  theme?: "light" | "dark";
}

function Error(props: IErrorProps) {
  return (
    <div
      className={classNames(
        styles.Container,
        props.compact && styles.compact,
        { [styles.Visible]: !!props.apiError },
        props.className
      )}
      style={props.style}
    >
      {!props.hideImage && (
        <img
          className={styles.Image}
          alt="Empty"
          src={
            props.theme === "dark"
              ? "/assets/images/ErrorScreen_dark.svg"
              : "/assets/images/ErrorScreen.svg"
          }
        />
      )}
      <div className={styles.Message}>Oops...Something went wrong</div>
      <div className={styles.Actions}>
        <a href="https://slack.inigo.io" target="_blank" rel="noreferrer">
          Contact Us
        </a>
        <Button label="Try Again" onClick={props.onTryAgain} />
      </div>
    </div>
  );
}

export default Error;
