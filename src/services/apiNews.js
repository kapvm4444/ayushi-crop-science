import { getDataByEndpoint } from "@/services/getData.js";

export async function getNews() {
  return await getDataByEndpoint("frontend/news");
}

export async function getNewsBySlug(slug) {
  return await getDataByEndpoint("frontend/news/detail", { slug });
}

export async function getBlogs() {
  return await getDataByEndpoint("frontend/blog");
}

export async function getBlogsBySlug(slug) {
  return await getDataByEndpoint("frontend/blog/detail", { slug });
}

export async function getEvent() {
  return await getDataByEndpoint("frontend/event");
}

export async function getEventBySlug(slug) {
  return await getDataByEndpoint("frontend/event/detail", { slug });
}
