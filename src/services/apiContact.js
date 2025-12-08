import { getDataByEndpoint } from "@/services/getData.js";

export async function getContactInfo() {
  const contactData = await getDataByEndpoint("contactus/list");
  return contactData[0];
}

export async function submitContactForm(data) {
  return await getDataByEndpoint("frontend/contact/submit", data);
}
