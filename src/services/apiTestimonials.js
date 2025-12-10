import { getDataByEndpoint } from "@/services/getData.js";

export async function getTestimonials() {
  return await getDataByEndpoint("frontend/testimonials");
}
