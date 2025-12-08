const baseUrl = import.meta.env.VITE_API_BASE_URL;
const keyHash = import.meta.env.VITE_API_KEY_HASH.toString();

export async function getDataByEndPoint(endpoint) {
  const formData = new FormData();
  formData.append("key_hash", keyHash);

  const res = await fetch(`${baseUrl}/${endpoint}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  console.log(data);
  return data.result;
}
