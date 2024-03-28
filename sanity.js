import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
export const client = createClient({
  projectId: "40r57lu6",
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2023-05-03",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => {
  return builder.image(source);
};
