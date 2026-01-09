import { restore } from "./restore"

/**
 * Restore files from `HEAD`, discarding both staged and unstaged changes.
 *
 * @example
 * ```ts
 * await git.restoreFromHead("file.txt")
 * ```
 *
 * @since 0.3.0
 */
export function restoreFromHead(paths: string | string[]): Promise<string> {
  return restore(paths, {
    flags: ["--staged", "--worktree"],
    "--source": "HEAD",
  })
}
