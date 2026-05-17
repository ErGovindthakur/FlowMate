import { runAutomation } from "./automation.service";

export async function automateLeadController(
  lead: {
    id: string;

    companyName: string;

    website: string;

    email: string;
  }
) {
  return runAutomation(lead);
}