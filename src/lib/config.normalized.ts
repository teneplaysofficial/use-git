import type { Config } from "./config"
import type { GitConfig, GitConfigRecord, GitConfigValue } from "./config.types"

export class NormalizedConfig {
  constructor(private config: Config) {}

  async list(): Promise<GitConfig> {
    const lines = await this.config.list()
    const res: GitConfig = {}

    for (const line of lines) {
      const index = line.indexOf("=")
      if (index === -1) continue

      const key = line.slice(0, index)
      const value: GitConfigValue = line.slice(index + 1)

      const lastDotIndex = key.lastIndexOf(".")
      if (lastDotIndex === -1) continue

      const head = key.slice(0, lastDotIndex)
      const name = key.slice(lastDotIndex + 1)

      const firstDot = head.indexOf(".")
      const section = firstDot === -1 ? head : head.slice(0, firstDot)
      const subsection = firstDot === -1 ? undefined : head.slice(firstDot + 1)

      res[section] ??= {}

      const sectionRecord = res[section] as GitConfigRecord

      if (subsection) {
        sectionRecord[subsection] ??= {}
        const subsectionRecord = sectionRecord[subsection] as GitConfigRecord

        subsectionRecord[name] = value
      } else {
        sectionRecord[name] = value
      }
    }

    return res
  }
}
