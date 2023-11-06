import { Network } from "@capacitor/network";

Network.addListener("networkStatusChange", (status) => {
  console.log("Network status changed", status);
});

export const logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();

    console.log('Network status:', status);
};