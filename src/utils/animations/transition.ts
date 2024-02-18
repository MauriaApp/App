import { createAnimation } from "@ionic/react";

export const RouterAnimation = (baseEl: HTMLElement, opts?: any) => {
  const enteringAnimation = createAnimation()
    .addElement(opts.enteringEl)
    .duration(500)
    .easing("cubic-bezier(0.32, 0.64, 0.75, 1)")
    .fromTo("opacity", 0, 1)
    .fromTo("transform", "scale(0.9)", "scale(1)");

  const leavingAnimation = createAnimation()
    .addElement(opts.leavingEl)
    .duration(400)
    .easing("cubic-bezier(0.32, 0.64, 0.75, 1)")
    .fromTo("opacity", 1, 0)
    .fromTo("transform", "translateY(0)", "translateY(-15%)");

  return createAnimation()
    .addAnimation([enteringAnimation, leavingAnimation]);
};
