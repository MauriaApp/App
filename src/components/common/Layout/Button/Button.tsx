import { Link } from "react-router-dom";
import styles from "./Button.module.scss";
import { useState } from "react";
import { ReactComponentOrElement } from "@ionic/react";
import clsx from "clsx";
import { useHaptics } from "../../../../utils/hooks/useHaptics";

type ButtonProps = {
  children: ReactComponentOrElement | string;
  className?: string;
  href?: string;
  variant?: "primary" | "accent";
  size?: "sm" | "md" | "lg";
  round?: boolean;
  disabled?: boolean;
  type?: string;
  onClick?: () => void;
};

const Button = (props: ButtonProps) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const { hapticsImpactMedium } = useHaptics();

  if (props.href) {
    return (
      <Link
        to={props.disabled ? "#" : props.href}
        onMouseDown={async () => {
          if (props.disabled) return;
          await hapticsImpactMedium();
          setIsPressed(true);
        }}
        onMouseUp={() => {
          if (props.disabled) return;

          setIsPressed(false);
          setIsAnimated(true);
        }}
        onClick={() => !props.disabled && props.onClick?.()}
        className={clsx(
          styles["button"],
          props.size && styles[props.size],
          props.disabled && styles["disabled"],
          props.className
        )}
      >
        <>
          <div
            className={clsx(
              styles["background"],
              isPressed && styles["pressed"],
              isAnimated && styles["animate"],
              props.variant && styles[props.variant],
              props.round && styles["round"]
            )}
          />

          {props.children}
        </>
      </Link>
    );
  }
  if (props.type === "submit") {
    return (
      <button
        className={clsx(
          styles["button"],
          props.size && styles[props.size],
          props.disabled && styles["disabled"],
          props.className
        )}
        onMouseDown={async () => {
          if (props.disabled) return;
          await hapticsImpactMedium();
          setIsPressed(true);
        }}
        onMouseUp={() => {
          setIsPressed(false);
          setIsAnimated(true);
        }}
        onClick={() => !props.disabled && props.onClick?.()}
        onAnimationEnd={() => setIsAnimated(false)}
      >
        <>
          <div
            className={clsx(
              styles["background"],
              isPressed && styles["pressed"],
              isAnimated && styles["animate"],
              props.variant && styles[props.variant],
              props.round && styles["round"]
            )}
          />
          {props.children}
        </>
      </button>
    );
  }

  return (
    <div
      className={clsx(
        styles["button"],
        props.size && styles[props.size],
        props.disabled && styles["disabled"],
        props.className
      )}
      onMouseDown={async () => {
        await hapticsImpactMedium();
        setIsPressed(true);
      }}
      onMouseUp={() => {
        setIsPressed(false);
        setIsAnimated(true);
      }}
      onClick={props.onClick}
      onAnimationEnd={() => setIsAnimated(false)}
    >
      <>
        <div
          className={clsx(
            styles["background"],
            isPressed && styles["pressed"],
            isAnimated && styles["animate"],
            props.variant && styles[props.variant],
            props.round && styles["round"]
          )}
        />
        {props.children}
      </>
    </div>
  );
};

export default Button;
