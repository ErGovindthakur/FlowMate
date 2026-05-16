import axios from "axios";
import * as cheerio from "cheerio";

import {
  normalizeUrl,
  cleanWebsiteContent,
} from "@/lib/url";

interface ScrapedData {
  title: string;
  metaDescription: string;
  headings: string[];
  paragraphs: string[];
  services: string[];
  socialLinks: string[];
  cleanContent: string;
}

export async function scrapeWebsite(
  url: string,
): Promise<ScrapedData> {
  try {
    // Normalize URL
    url = normalizeUrl(url);

    // Fetch website HTML
    const { data } = await axios.get(url, {
      timeout: 10000,

      headers: {
        "User-Agent": "Mozilla/5.0 AI Automation Bot",
      },
    });

    // Load HTML
    const $ = cheerio.load(data);

    // Remove unwanted tags
    $(
      "script, style, noscript, iframe, svg, img, footer, nav, header",
    ).remove();

    // Extract title
    const title = $("title").text().trim();

    // Extract meta description
    const metaDescription =
      $('meta[name="description"]').attr("content") || "";

    // Extract headings
    const headings = $("h1, h2, h3")
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(Boolean);

    // Extract paragraphs
    const paragraphs = $("p")
      .map((_, el) => $(el).text().trim())
      .get()
      .filter((text) => text.length > 40);

    // Extract social links
    const socialLinks = $("a")
      .map((_, el) => $(el).attr("href"))
      .get()
      .filter(
        (href): href is string =>
          !!href &&
          (href.includes("linkedin") ||
            href.includes("twitter") ||
            href.includes("facebook") ||
            href.includes("instagram")),
      );

    // Extract services
    const services = headings.filter((heading) =>
      heading.toLowerCase().includes("service"),
    );

    // Generate cleaned content
    const cleanContent = cleanWebsiteContent(
      headings,
      paragraphs,
    );

    return {
      title,
      metaDescription,
      headings,
      paragraphs,
      services,
      socialLinks,
      cleanContent,
    };
  } catch (error) {
    console.error("Scraping error:", error);

    throw new Error("Failed to scrape website");
  }
}