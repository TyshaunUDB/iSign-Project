import type { Category, SignItem } from "../types/dictionary";

const API = "https://9dsmocz0i3.execute-api.ap-southeast-2.amazonaws.com/prod";

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API}/dict/categories`);
  if (!res.ok) throw new Error("Failed to load categories");
  return res.json();
}

export async function fetchSigns(categorySlug?: string): Promise<SignItem[]> {
  const url = categorySlug
    ? `${API}/dict/signs?category=${encodeURIComponent(categorySlug)}`
    : `${API}/dict/signs`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load signs");
  return res.json();
}

export async function fetchSign(slug: string): Promise<SignItem & { media: any[] }> {
  const res = await fetch(`${API}/dict/signs/${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error("Failed to load sign");
  return res.json();
}
