import { InitOptions } from "../types/Init";
import { Base } from "../utils/base";

export class Init {
  constructor(private git: Base) {}

  async run(options: InitOptions) {
    await this.git.runCmd("init");
  }
}
