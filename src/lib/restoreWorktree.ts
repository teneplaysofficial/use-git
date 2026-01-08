import type { Api } from "../types/api"

/**
 * Restore files in the working tree from the index.
 *
 * @example
 * ```ts
 * await git.restoreWorktree("file.txt")
 * ```
 *
 * @since 0.3.0
 */
export function restoreWorktree(
  this: Api,
  paths: string | string[],
): Promise<Api> {
  return this.restore(paths, { flags: ["--worktree"] })
}
