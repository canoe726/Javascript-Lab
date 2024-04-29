export interface HttpResponse<Data> {
  status: number;
  message: string;
  data: Data;
}
