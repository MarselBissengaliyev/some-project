export interface StatusInterface {
  id: number;
  type: string;
  name: string;
  order: number;
  color: string;
}

export interface UmnikoWebhookDataBody {
  type?: string;
  message: {
    sender: {
      socialId: string;
    };
  };
  leadId: string;
  lead?: {
    statusId: number;
    amount: number;
    customer: {
      login: string;
    };
  };
}
