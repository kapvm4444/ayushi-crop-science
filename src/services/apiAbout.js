import { getDataByEndpoint } from "@/services/getData.js";

export async function getAbout() {
  return await getDataByEndpoint("frontend/about");
}

export async function getVisionMission() {
  return await getDataByEndpoint("frontend/vision-mission");
}
