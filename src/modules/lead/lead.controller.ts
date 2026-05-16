import { createLeadService } from "./lead.service";

export async function createLeadController(data: any) {
  return createLeadService(data);
}