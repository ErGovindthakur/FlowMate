import { createLead } from "./lead.repository";
import { CreateLeadInput } from "./lead.types";

export async function createLeadService(data: CreateLeadInput) {
  return createLead(data);
}