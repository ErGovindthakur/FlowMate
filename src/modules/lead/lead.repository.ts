import { prisma } from "@/lib/prisma";
import { CreateLeadInput } from "./lead.types";

export async function createLead(data: CreateLeadInput) {
  return prisma.lead.create({
    data,
  });
}