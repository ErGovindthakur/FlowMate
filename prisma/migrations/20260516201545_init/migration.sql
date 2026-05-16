-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('PENDING', 'SCRAPING', 'GENERATING_INSIGHTS', 'GENERATING_PDF', 'SENDING_EMAIL', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "industry" TEXT,
    "scrapedData" JSONB,
    "insights" JSONB,
    "pdfUrl" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);
