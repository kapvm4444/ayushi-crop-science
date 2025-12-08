import { getDataByEndpoint } from "@/services/getData.js";

export async function getGalleryImages() {
  return await getDataByEndpoint("gallery");
}
