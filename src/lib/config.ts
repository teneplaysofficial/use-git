import type Base from "../utils/base"
import { GetConfig } from "./config.get"
import { NormalizedConfig } from "./config.normalized"

export class Config {
  get: GetConfig
  normalized: NormalizedConfig

  constructor(private git: Base) {
    this.get = new GetConfig()
    // this.get = new GetConfig(this);
    this.normalized = new NormalizedConfig(this)
  }

  async list(): Promise<string[]> {
    const res = (await this.git.runCmd("config", ["--list"]))
      .split(/\r?\n/g)
      .filter(Boolean)

    return res
  }
}
