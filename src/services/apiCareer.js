import { getDataByEndpoint } from "@/services/getData.js";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const keyHash = import.meta.env.VITE_API_KEY_HASH.toString();

export async function getCareer() {
  return await getDataByEndpoint("frontend/career");
}

export async function getCareerBySlug(slug) {
  return await getDataByEndpoint("frontend/career/detail", { slug });
}

export async function submitCareer(payload) {
  const formData = new FormData();
  formData.append("key_hash", keyHash);

  Object.keys(payload).forEach((key) => {
    formData.append(key, payload[key]);
  });

  const res = await fetch(`${baseUrl}/frontend/career/submit`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to submit application");
  }

  const data = await res.json();
  return data;
}
