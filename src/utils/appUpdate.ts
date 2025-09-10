import { isNative } from "./native";

export async function getAppUpdateInfoSafe() {
  if (!isNative) return null;
  try {
    const { AppUpdate } = await import("@capawesome/capacitor-app-update");
    return await AppUpdate.getAppUpdateInfo();
  } catch {
    return null;
  }
}
