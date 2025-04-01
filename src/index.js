import { execute } from "./updater.js";

const timeInterval = process.env.TIME_INTERVAL_IN_MINUTES * 60 * 1000;

execute();
setInterval(execute, timeInterval);