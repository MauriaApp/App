import { createAnimation } from "@ionic/react";

export const RouterAnimation = (baseEl: HTMLElement, opts?: any) => {
  const enteringAnimation = createAnimation()
    .addElement(opts.enteringEl)
    .fromTo("opacity", "0", "1")
    .fromTo("transform", "translateX(100%)", "translateX(0%)")
    .duration(600)
    .easing("cubic-bezier(0.85, 0, 0.15, 1)");

  const leavingAnimation = createAnimation()
    .addElement(opts.leavingEl)
    .fromTo("opacity", "1", "0")
    .fromTo("transform", "translateX(0%)", "translateX(-100%)")
    .duration(600)
    .easing("cubic-bezier(0.85, 0, 0.15, 1)");

  return createAnimation().addAnimation([enteringAnimation, leavingAnimation]);
};

