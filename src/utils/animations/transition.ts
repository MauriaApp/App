import { createAnimation } from "@ionic/react";

export const RouterAnimation = (baseEl: HTMLElement, opts?: any) => {
  const enteringAnimation = createAnimation()
    .addElement(opts.enteringEl)
    .fromTo("transform", "translateX(100%)", "translateX(0%)")
    .duration(800)
    .easing("cubic-bezier(0.85, 0, 0.15, 1)");
  const leavingAnimation = createAnimation()
    .addElement(opts.leavingEl)
    .fromTo("transform", "translateX(0%)", "translateX(-100%)")
    .duration(800)
    .easing("cubic-bezier(0.85, 0, 0.15, 1)");

  return createAnimation()
    .addAnimation(enteringAnimation)
    .addAnimation(leavingAnimation);
};
