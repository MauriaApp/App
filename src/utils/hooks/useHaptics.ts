import { useLocalStorage } from "usehooks-ts";
import { ImpactStyle } from "@capacitor/haptics";
import { hapticImpact } from "../haptics";

export const useHaptics = () => {
  const [haptics, setHaptics] = useLocalStorage("useHaptics", true);

  const toggle = () => {
    setHaptics(!haptics);
  };

  const enable = () => {
    setHaptics(true);
  };

  const disable = () => {
    setHaptics(false);
  };

  const hapticsImpactHeavy = async () => {
    haptics && (await hapticImpact(ImpactStyle.Heavy));
  };

  const hapticsImpactMedium = async () => {
    haptics && (await hapticImpact(ImpactStyle.Medium));
  };

  const hapticsImpactLight = async () => {
    haptics && (await hapticImpact(ImpactStyle.Light));
  };

  return {
    haptics,
    setHaptics,
    toggle,
    enable,
    disable,
    hapticsImpactHeavy,
    hapticsImpactMedium,
    hapticsImpactLight,
  };
};
