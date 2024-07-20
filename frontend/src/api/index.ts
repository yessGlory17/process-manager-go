import { goProcessResult } from "./types";

declare global {
  interface Window {
    goProcess: () => goProcessResult;
  }
}
