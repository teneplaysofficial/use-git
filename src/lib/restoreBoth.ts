import type { Api } from "../types/api"

/**
 * Restore files in both the index and working tree from a given source.
 *
 * @example
 * ```ts
 * // Restore from HEAD
 * await git.restoreBoth("file.txt")
 *
 * // Restore multiple files from a commit
 * await git.restoreBoth(["file1.txt", "file2.txt"],"abc123")
 * ```
 *
 * @since 0.3.0
 */
export function restoreBoth(
  this: Api,
  paths: string | string[],
  /**
   * The Git tree-ish to restore from.
   *
   * @example
   * - "HEAD"
   * - "main"
   * - "HEAD~1"
   * - "commit SHA"
   *
   * @default "HEAD"
   */
  source: string = "HEAD",
): Promise<Api> {
  return this.restore(paths, {
    flags: ["--staged", "--worktree"],
    "--source": source,
  })
}
