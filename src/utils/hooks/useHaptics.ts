import { useLocalStorage } from "usehooks-ts";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

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
    haptics && (await Haptics.impact({ style: ImpactStyle.Heavy }));
  };

  const hapticsImpactMedium = async () => {
    haptics && (await Haptics.impact({ style: ImpactStyle.Medium }));
  };

  const hapticsImpactLight = async () => {
    haptics && (await Haptics.impact({ style: ImpactStyle.Light }));
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
