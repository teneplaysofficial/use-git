import { Base } from "../utils/base";
import { NormalizedBranch } from "./branch.normalized";
import { BranchFlags } from "./branch.types";

export class Branch {
  normalized: NormalizedBranch;

  constructor(private git: Base) {
    this.normalized = new NormalizedBranch(this);
  }

  private parseList(output: string): string[] {
    return output
      .split("\n")
      .map((b) => b.replace(/^\*?\s+/, ""))
      .filter(Boolean);
  }

  async all(): Promise<string[]> {
    return this.parseList(
      await this.git.runCmd("branch", ["--all"] as BranchFlags[])
    );
  }

  /**
   * Get the  name of the current branch.
   *
   * @returns The current branch name.
   *
   * @example
   * ```ts
   * import git from "use-git";
   *
   * console.log(await git.branch.current());
   * // main
   * ```
   */
  current(): Promise<string> {
    return this.git.runCmd("branch", ["--show-current"] as BranchFlags[]);
  }

  /**
   * Only lists branches which contain the specified commit.
   *
   * @returns A list of branches that contain the specified commit.
   *
   * @example
   * ```ts
   * import git from "use-git";
   *
   * console.log(await git.branch.contains("a1b2c3d4"));
   * // [ "main", "feature-branch" ]
   * ```
   */
  async contains(
    /**
     * The commit to check.
     *
     * @default "HEAD"
     */
    commit = "HEAD"
  ): Promise<string[]> {
    return this.parseList(
      await this.git.runCmd("branch", ["--contains", commit] as any)
    );
  }
}
