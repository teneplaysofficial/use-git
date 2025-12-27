import type Base from "../utils/base"
import type { InitOptions } from "./init.types"

export class Init {
  constructor(private git: Base) {}

  async create(opts: InitOptions = {}) {
    await this.git.runCmd("init", this.git.buildArgs(opts))

    return this
  }
}
