import type { Api } from "../types/api"

/**
 * Restore files in both the index and working tree.
 *
 * @example
 * ```ts
 * await git.restoreBoth("file.txt")
 * ```
 *
 * @since 0.3.0
 */
export function restoreBoth(this: Api, paths: string | string[]): Promise<Api> {
  return this.restore(paths, {
    flags: ["--staged", "--worktree"],
  })
}
