import { HttpResponse } from "models/http";

export const httpResponseInterceptor = (req: Request, res: any, next: any) => {
  const originalSend = res.send;
  res.send = function (data: any) {
    const responseObject: HttpResponse<any> = {
      status: res.statusCode,
      message: res.statusMessage,
      data: data,
    };
    res.send = originalSend;
    return res.send(responseObject);
  };
  next();
};
