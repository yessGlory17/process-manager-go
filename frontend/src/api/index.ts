import { goProcessResult, ProcessDetailResult } from "./types";

declare global {
  interface Window {
    goProcess: () => goProcessResult;
    processDetail: (pid: number) => ProcessDetailResult;
  }
}
