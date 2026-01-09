import utils from "../../internal"
import { versionCache } from "../cache/versionCache"

/**
 * @example "git version 2.51.2.windows.1"
 *
 * @since 0.1.0
 */
export async function rawVersion(): Promise<string> {
  if (versionCache.version?.raw) return versionCache.version.raw

  const raw = await utils.runCmd("", ["--version"])

  versionCache.version = { raw, ...versionCache.version }

  return raw
}
