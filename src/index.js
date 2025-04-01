import { executeDnsUpdate } from "./updater.js";

const timeInterval = 15 * 1000 // 15 seconds

setInterval(
    executeDnsUpdate, 
    timeInterval
);