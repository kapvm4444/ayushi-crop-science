import { getDataByEndpoint } from "@/services/getData.js";

export async function getVideos() {
    return await getDataByEndpoint("frontend/videos");
}
