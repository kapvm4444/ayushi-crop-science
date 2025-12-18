const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.0.103/ayushiCrop_React/public/api";
const keyHash = (process.env.NEXT_PUBLIC_API_KEY_HASH || "1234567890").toString();

export async function getDataByEndpoint(
  endpoint,
  payload = {},
  fieldName = undefined,
) {
  const formData = new FormData();
  formData.append("key_hash", keyHash);

  Object.keys(payload).map((key) => {
    formData.append(key, payload[key]);
  });

  const res = await fetch(`${baseUrl}/${endpoint}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`API Error ${res.status} for ${endpoint}:`, errorText);
    throw new Error(`API Request Failed: ${res.statusText}`);
  }

  const data = await res.json();
  return fieldName ? data[fieldName] : (data.result || data.product || data.categories || data.products || data.states || data.districts || data.talukas || data.villages || data);
}
