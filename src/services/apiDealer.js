import { getDataByEndpoint } from "@/services/getData.js";

export async function submitDealerForm(data) {
    return await getDataByEndpoint("frontend/dealer/submit", data);
}
