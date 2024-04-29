import { Router } from "express";

export interface ServerRouters {
  router: Router;
  endPoint: string;
}

export interface SocketMap {
  [channel: string]: {
    namespace: string;
    message: string;
  };
}
