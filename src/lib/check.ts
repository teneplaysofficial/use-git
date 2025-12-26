import type Base from "../utils/base"

export class Check {
  constructor(private git: Base) {}

  isRepo(): Promise<boolean> {
    return this.git.runCmdSafe("rev-parse", ["--is-inside-work-tree"])
  }

  async hasCleanWorkingTree(): Promise<boolean> {
    const res = await this.git.runCmd("status", ["--porcelain"])

    return !res.length
  }
}
