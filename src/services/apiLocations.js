import { getDataByEndpoint } from "@/services/getData.js";

// Fetch Location Data (States, Areas, Districts, etc.)
export async function getStates() {
  return await getDataByEndpoint("state/list", {}, "states");
}

export async function getStateAreas(stateId) {
  if (!stateId) return [];
  // The API likely returns all and we filter, or we pass payload.
  // Based on instructions "they have a field for foreign reference, and need to show only related data... if select gujarat then show releted".
  // Assuming the API filters by payload if we send 'state_id'.
  // If not, we might need to filter client side, but "pass the ID ... to the api" suggests filtering on backend or client.
  // Given "endpoint: statearea/list", usually list endpoints return all unless filtered.
  // However, `getDataByEndpoint` supports payload. Let's try sending `state_id`.
  return await getDataByEndpoint(
    "statearea/list",
    { state_id: stateId },
    "stateareas",
  );
}

export async function getDistricts(stateAreaId) {
  if (!stateAreaId) return [];
  return await getDataByEndpoint(
    "district/list",
    { statearea_id: stateAreaId },
    "districts",
  );
}

export async function getTalukas(districtId) {
  if (!districtId) return [];
  return await getDataByEndpoint(
    "taluka/list",
    { district_id: districtId },
    "talukas",
  );
}

export async function getVillages(talukaId) {
  if (!talukaId) return [];
  return await getDataByEndpoint(
    "village/list",
    { taluka_id: talukaId },
    "villages",
  );
}
