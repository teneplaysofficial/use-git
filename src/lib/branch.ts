import { Base } from "../utils/base";
import { NormalizedBranch } from "./branch.normalized";

export class Branch {
  normalized: NormalizedBranch;

  constructor(private git: Base) {
    this.normalized = new NormalizedBranch(this);
  }

  async all(): Promise<string[]> {
    return (await this.git.runCmd("branch", ["-a"]))
      .split("\n")
      .map((b) => b.replace(/^\*?\s+/, ""))
      .filter(Boolean);
  }

  current(): Promise<string> {
    return this.git.runCmd("branch", ["--show-current"]);
  }
}
