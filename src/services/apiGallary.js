import { getDataByEndPoint } from "@/services/getDataByEndPoint.js";

export async function getGalleryImages() {
  return await getDataByEndPoint("gallery");
}
