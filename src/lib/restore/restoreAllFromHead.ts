import { restore } from "./restore"

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
export function restoreAllFromHead(): Promise<string> {
  return restore(".", {
    "--source": "HEAD",
    flags: ["--staged", "--worktree"],
  })
}
