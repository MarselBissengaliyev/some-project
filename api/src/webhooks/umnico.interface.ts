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
    }
  };
}

