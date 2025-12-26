import type Base from "../utils/base"
import type { InitOptions } from "./init.types"

export class Init {
  constructor(private git: Base) {}

  async run(_options: InitOptions): Promise<void> {
    await this.git.runCmd("init")
  }
}
