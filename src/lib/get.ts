import type Base from "../utils/base"

export class Get {
  private cache: {
    version?: {
      raw?: string
      platform?: string
    }
  } = {}

  constructor(private git: Base) {}

  /**
   *
   * @returns
   *
   * @example "git version 2.51.2.windows.1"
   */
  async rawVersion(): Promise<string> {
    if (this.cache.version?.raw) return this.cache.version.raw

    const raw = await this.git.runCmd("", ["--version"])

    this.cache.version = { raw, ...this.cache.version }
    return raw
  }

  /**
   *
   * @returns
   *
   * @example "2.51.2.windows.1"
   */
  async version(): Promise<string> {
    const version: string = this.cache.version?.raw ?? (await this.rawVersion())
    const match = version.match(/git version\s+(.+)/)
    if (!match) throw new Error(`Unable to parse git version: ${version}`)

    this.cache.version = {
      platform: match[1].split(".")[3],
      ...this.cache.version,
    }

    return match[1]
  }

  /**
   *
   * @returns
   *
   * @example "windows"
   */
  platform(): string {
    const platform = this.cache.version?.platform
    if (!platform)
      throw new Error(
        "Git platform is not available, Call `git.get.version()` before calling `git.get.platform()`.",
      )

    return platform
  }
}
