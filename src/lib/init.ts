import { InitOptions } from "./init.types";
import { Base } from "../utils/base";

export class Init {
  constructor(private git: Base) {}

  async run(options: InitOptions): Promise<void> {
    await this.git.runCmd("init");
  }
}
