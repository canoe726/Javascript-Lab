export interface LineMessage {
  type: string;
  id: string;
  quoteToken: string;
  text: string;
}

export interface LineMessageWebHookResponse {
  destination: string;
  events: {
    type: string;
    message: LineMessage;
    webhookEventId: string;
    deliveryContext: any;
    timestamp: number;
    source: any;
    replyToken: string;
    mode: string;
  }[];
}
