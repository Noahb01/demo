"use server";

import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

export type InquiryState = {
  ok: boolean;
  message: string;
};

export async function submitInquiry(
  _prev: InquiryState | undefined,
  formData: FormData,
): Promise<InquiryState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const listingSlug = String(formData.get("listingSlug") || "").trim();
  const listingTitle = String(formData.get("listingTitle") || "").trim();

  if (!name || !email || !message) {
    return {
      ok: false,
      message: "Please fill in your name, email, and message.",
    };
  }

  const body = [
    `Listing: ${listingTitle || listingSlug || "—"}`,
    `Slug: ${listingSlug || "—"}`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    "",
    message,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL || siteConfig.email;

  if (!apiKey) {
    console.info("[inquiry] RESEND_API_KEY not set; inquiry logged only.");
    console.info(body);
    return {
      ok: true,
      message:
        "Thank you — your inquiry was received. (Email delivery is not configured in this environment.)",
    };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from:
      process.env.RESEND_FROM ||
      `ShipShelter <onboarding@resend.dev>`,
    to: [to],
    subject: `Inquiry: ${listingTitle || listingSlug || "ShipShelter"}`,
    text: body,
    replyTo: email,
  });

  if (error) {
    return {
      ok: false,
      message: "Could not send your message. Please try again shortly.",
    };
  }

  return {
    ok: true,
    message: "Thank you — we will respond shortly.",
  };
}
