import { getDataByEndpoint } from "@/services/getData.js";

export async function getContactInfo() {
  const contactData = await getDataByEndpoint(
    "contactus/list",
    {},
    "contactus",
  );
  return contactData[0];
}

export async function submitContactForm(data) {
  return await getDataByEndpoint("frontend/contact/submit", data);
}

export async function getFaqs() {
  return await getDataByEndpoint("frontend/faqs");
}
