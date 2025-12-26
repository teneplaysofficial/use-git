import type { Branch } from "./branch"

export class NormalizedBranch {
  constructor(private branch: Branch) {}

  /**
   * Get the list of all branches (local and remote) in a normalized format.
   *
   * @returns  An object with local, remote, and head branch names.
   *
   * @example
   * ```ts
   * import git from "use-git";
   *
   * console.log(await git.branch.normalized.all());
   * // {
   * //   local: [ "main", "feature-branch" ],
   * //   remote: [ "origin/main", "origin/feature-branch" ],
   * //   head: "origin/main"
   * // }
   * ```
   */
  async all(): Promise<{
    local: string[]
    remote: string[]
    head?: string
  }> {
    const branches = await this.branch.all()

    const local: string[] = []
    const remote: string[] = []
    let head: string | undefined

    for (const b of branches) {
      if (b.startsWith("remotes/")) {
        const name = b.replace(/^remotes\//, "")

        if (name.includes("/HEAD ->")) {
          head = name.split("->")[1].trim()
        } else {
          remote.push(name)
        }
      } else {
        local.push(b)
      }
    }

    return { local, remote, head }
  }
}
