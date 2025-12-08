import { getDataByEndPoint } from "@/services/getDataByEndPoint.js";

export async function getAbout() {
  return await getDataByEndPoint("frontend/about");
}

export async function getVisionMission() {
  return await getDataByEndPoint("frontend/vision-mission");
}
