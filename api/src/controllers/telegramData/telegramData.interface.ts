export interface UpdateUmnicoLeadIdDataBody {
  type?: string;
  message: {
    sender: {
      socialId: string;
    };
  };
  leadId: string;
}
