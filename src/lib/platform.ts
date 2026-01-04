import type { Api } from "../types/api"
import { versionCache } from "./cache"

/**
 * @example "windows"
 *
 * @since 0.1.0
 */
export async function platform(this: Api): Promise<string | undefined> {
  if (versionCache.version?.platform) return versionCache.version?.platform

  await this.version()

  return versionCache.version?.platform
}
