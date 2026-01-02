import utils from "../internal"

/** @ignore */
const _cache: {
  version?: {
    raw?: string
    platform?: string
  }
} = {}

/**
 * @since 0.1.0
 */
export async function isCleanWorkingTree(): Promise<boolean> {
  const res = await utils.runCmd("status", ["--porcelain"])
  return !res.length
}

/**
 * @since 0.1.0
 */
export async function isGitInstalled(): Promise<boolean> {
  return utils.runCmdSafe("", ["--version"])
}

/**
 * @since 0.1.0
 */
export function isInitialized(): Promise<boolean> {
  return utils.runCmdSafe("rev-parse", ["--git-dir"])
}

/**
 * @since 0.1.0
 */
export function isRepo(): Promise<boolean> {
  return utils.runCmdSafe("rev-parse", ["--is-inside-work-tree"])
}

/**
 * @example "git version 2.51.2.windows.1"
 *
 * @since 0.1.0
 */
export async function rawVersion() {
  if (_cache.version?.raw) return _cache.version.raw

  const raw = await utils.runCmd("", ["--version"])

  _cache.version = { raw, ..._cache.version }

  return raw
}

/**
 * @example "2.51.2.windows.1"
 *
 * @since 0.1.0
 */
export async function version(): Promise<string> {
  const version: string = _cache.version?.raw ?? (await rawVersion())
  const match = version.match(/git version\s+(.+)/)
  if (!match) throw new Error(`Unable to parse git version: ${version}`)

  _cache.version = {
    platform: match[1].split(".")[3],
    ..._cache.version,
  }

  return match[1]
}

/**
 * @example "windows"
 *
 * @since 0.1.0
 */
export async function platform(): Promise<string | undefined> {
  if (_cache.version?.platform) return _cache.version?.platform

  await version()

  return _cache.version?.platform
}
