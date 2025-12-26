import type Base from "../utils/base"

export class Commit {
  constructor(private git: Base) {}

  async run(_options: string): Promise<void> {
    await this.git.runCmd("commit")
  }
}
