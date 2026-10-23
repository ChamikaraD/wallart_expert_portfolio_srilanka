import { cacheLife } from "next/cache";

/** Cached and revalidated daily, so the year stays current while the page remains static. */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
