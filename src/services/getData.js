const baseUrl = import.meta.env.VITE_API_BASE_URL;
const keyHash = import.meta.env.VITE_API_KEY_HASH.toString();

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
