import { versionCache } from "../cache/versionCache"
import { rawVersion } from "./rawVersion"

/**
 * @example "2.51.2.windows.1"
 *
 * @since 0.1.0
 */
export async function version(): Promise<string> {
  const version: string = versionCache.version?.raw ?? (await rawVersion())
  const match = version.match(/git version\s+(.+)/)
  if (!match) throw new Error(`Unable to parse git version: ${version}`)

  versionCache.version = {
    platform: match[1].split(".")[3],
    ...versionCache.version,
  }

  return match[1]
}
