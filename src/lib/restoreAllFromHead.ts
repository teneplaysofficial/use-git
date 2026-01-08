import type { Api } from "../types/api"

/**
 * Restore all files in both the index and working tree from HEAD.
 *
 * This discards **all staged and unstaged changes**.
 *
 * @example
 * ```ts
 * await git.restoreAllFromHead()
 * ```
 *
 * @since 0.3.0
 */
export function restoreAllFromHead(this: Api): Promise<Api> {
  return this.restore(".", {
    "--source": "HEAD",
    flags: ["--staged", "--worktree"],
  })
}
