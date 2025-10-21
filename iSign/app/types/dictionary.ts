export type Category = {
  slug: string;
  name: string;
  description?: string;
  banner_url?: string | null;
};

export type SignItem = {
  slug: string;
  name: string;
  gloss?: string;
  thumbnail_url?: string | null;
};
