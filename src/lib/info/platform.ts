import { versionCache } from "../cache"
import { version } from "./version"

/**
 * @example "windows"
 *
 * @since 0.1.0
 */
export async function platform(): Promise<string | undefined> {
  if (versionCache.version?.platform) return versionCache.version?.platform

  await version()

  return versionCache.version?.platform
}
