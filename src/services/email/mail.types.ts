export interface SendMailInput {
  leadId: string;

  to: string;

  subject: string;

  html: string;
}