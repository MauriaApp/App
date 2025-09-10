import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { isNative } from "./native";

export async function hapticImpact(style: ImpactStyle = ImpactStyle.Medium) {
  if (!isNative) return;
  try { await Haptics.impact({ style }); } catch {}
}
