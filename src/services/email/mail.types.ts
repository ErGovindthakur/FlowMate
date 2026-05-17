export interface SendMailInput {
  leadId: string;

  to: string;

  subject: string;

  html: string;

  attachmentPath?: string;

  attachmentName?: string;
}