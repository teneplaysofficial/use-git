import type Base from "../utils/base"
import { Commit } from "./commit"

export class Add extends Commit {
  constructor(protected git: Base) {
    super(git)
  }

  async add(args: readonly string[]): Promise<this> {
    let isFiles: boolean = false

    if (Array.isArray(args)) isFiles = true

    await this.git.runCmd("add", isFiles ? args : [])

    return this
  }

  async files(paths: readonly string[]): Promise<this> {
    await this.git.runCmd("add", paths)

    return this
  }
}
