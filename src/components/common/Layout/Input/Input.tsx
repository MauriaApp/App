import styles from "./Input.module.scss";
import { useState } from "react";

import { ReactComponent as Show } from "../../../../assets/svg/icons/Show.svg";
import { ReactComponent as Hide } from "../../../../assets/svg/icons/Hide.svg";
import { ReactComponentOrElement } from "@ionic/react";
import clsx from "clsx";

type InputProps = {
  icon?: ReactComponentOrElement;
  type?: string;
  onChange?: Function;
  isRounded?: boolean;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  register?: any;
};

const Input = (props: InputProps) => {
  const [isShown, setIsShown] = useState(false);

  if (props.type === "password") {
    return (
      <div
        className={clsx(
          styles["input-container"],
          "glassy",
          props.isRounded && styles["round"]
        )}
      >
        <>
          {props.icon}
          <input
            className={styles["input"]}
            type={isShown ? "text" : "password"}
            placeholder={props.placeholder ?? ""}
            defaultValue={props.defaultValue}
            value={props.value}
            {...props.register}
          />
          <div
            className={styles["showIcon"]}
            onClick={() => setIsShown((a) => !a)}
          >
            {isShown ? <Hide /> : <Show />}
          </div>
        </>
      </div>
    );
  }

  if (props.icon) {
    return (
      <div
        className={clsx(
          styles["input-container"],
          "glassy",
          props.isRounded && styles["round"]
        )}
      >
        <>
          {props.icon}
          <input
            className={styles["input"]}
            type={props.type ?? "text"}
            defaultValue={props.defaultValue}
            placeholder={props.placeholder ?? ""}
            {...props.register}
          />
        </>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        styles["input-container"],
        "glassy",
        props.isRounded && styles["round"]
      )}
    >
      <input
        className={styles["input"]}
        type={props.type ?? "text"}
        placeholder={props.placeholder ?? ""}
        defaultValue={props.defaultValue}
        onChange={props.onChange ?? null}
        {...props.register}
      />
    </div>
  );
};

export default Input;
