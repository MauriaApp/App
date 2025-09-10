import { Style, StatusBar } from "@capacitor/status-bar";
import { isNative } from "./native";

export async function setStatusBar(style: Style) {
  if (!isNative) return;
  try { await StatusBar.setStyle({ style }); } catch {}
}
