import type Base from "../utils/base"
import { NormalizedBranch } from "./branch.normalized"
import type { BranchFlags } from "./branch.types"

export class Branch {
  normalized: NormalizedBranch

  constructor(private git: Base) {
    this.normalized = new NormalizedBranch(this)
  }

  private parseList(output: string): string[] {
    return output
      .split("\n")
      .map((b) => b.replace(/^\*?\s+/, ""))
      .filter(Boolean)
  }

  /**
   * Get the list of all branches (local and remote).
   *
   * @returns  A list of all branch names.
   *
   * @example
   * ```ts
   * import git from "use-git";
   *
   * console.log(await git.branch.all());
   * // [ "main", "feature-branch", "remotes/origin/main", "remotes/origin/feature-branch" ]
   * ```
   */
  async all(): Promise<string[]> {
    return this.parseList(
      await this.git.runCmd("branch", ["--all"] as BranchFlags[]),
    )
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
    return this.git.runCmd("branch", ["--show-current"] as BranchFlags[])
  }

  /**
   * List branches that contain a given commit or reference.
   *
   * @returns A list of branches that contain the given commit or reference.
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
    commit = "HEAD",
  ): Promise<string[]> {
    return this.parseList(
      await this.git.runCmd("branch", ["--contains", commit]),
    )
  }

  /**
   * Create a new branch.
   *
   * @example
   * ```ts
   * await git.branch.create("feature")
   * await git.branch.create("hotfix", "v1.0.0")
   * ```
   */
  async create(
    /** Name of the new branch */
    name: string,
    /** Optional start point (commit, tag, branch, or ref) */
    startPoint?: string,
  ): Promise<this> {
    await this.git.runCmd("branch", [name, startPoint])

    return this
  }

  /**
   * Switch to an existing branch.
   *
   * @example
   * ```ts
   * await git.branch.switch("main")
   * ```
   */
  async switch(
    /** Branch name to switch to */
    name: string,
  ): Promise<this> {
    await this.git.runCmd("switch", [name])

    return this
  }

  /**
   * Delete a local branch.
   *
   * @example
   * ```ts
   * await git.branch.delete("feature")
   * await git.branch.delete("feature", { force: true })
   * ```
   */
  async delete(
    /** Branch name to delete */
    name: string,
    {
      force = false,
    }: {
      /**
       * Force deletion even if branch is not merged.
       *
       * @default false
       */
      force?: boolean
    } = {},
  ): Promise<this> {
    await this.git.runCmd("branch", [force ? "-D" : "-d", name])

    return this
  }

  /**
   * Rename branch.
   *
   * @throws If the source branch does not exist
   *
   * @example
   * ```ts
   * await git.branch.rename("master", "main")
   * await git.branch.rename("feature-old", "feature-new")
   * ```
   */
  async rename(
    /** The existing branch name */
    oldName: string,
    /** The existing branch name */
    newName: string,
  ): Promise<this> {
    await this.git.runCmd("branch", ["-m", oldName, newName])

    return this
  }
}
