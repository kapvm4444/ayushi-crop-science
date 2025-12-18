import { getDataByEndpoint } from "@/services/getData.js";

export async function getNews(page = 1) {
  return await getDataByEndpoint("frontend/news", { page });
}

export async function getNewsBySlug(slug) {
  return await getDataByEndpoint("frontend/news/detail", { slug });
}

export async function getBlogs(page = 1) {
  return await getDataByEndpoint("frontend/blog", { page });
}

export async function getBlogsBySlug(slug) {
  return await getDataByEndpoint("frontend/blog/detail", { slug });
}

export async function getEvent(page = 1) {
  return await getDataByEndpoint("frontend/event", { page });
}

export async function getEventBySlug(slug) {
  return await getDataByEndpoint("frontend/event/detail", { slug });
}
