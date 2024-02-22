import { createAnimation } from "@ionic/react";

export const RouterAnimation = (baseEl: HTMLElement, opts?: any) => {
  const enteringAnimation = createAnimation()
    .addElement(opts.enteringEl)
    .duration(300)
    .easing("ease-out")
    .fromTo("opacity", 0, 1)
    .fromTo("transform", "scale(0.95)", "scale(1)");

  const leavingAnimation = createAnimation()
    .addElement(opts.leavingEl)
    .duration(300)
    .easing("ease-in-out")
    .fromTo("opacity", 1, 0)
    .fromTo("transform", "translateY(0)", "translateY(-5%)");

  return createAnimation()
    .addAnimation([enteringAnimation, leavingAnimation]);
};
