import { getDataByEndpoint } from "@/services/getData.js";

export async function getStaticPages() {
  return await getDataByEndpoint("frontend/static-page");
}
