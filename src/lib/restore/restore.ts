import utils from "../../internal"
import type { RestoreOptions } from "../types"

/**
 * Restore working tree files.
 *
 * @example
 * ```ts
 * // Restore file from index
 * await git.restore("file.txt")
 *
 * // Restore all files
 * await git.restore(".")
 *
 * // Restore staged file
 * await git.restore("file.txt", { flags: ["--staged"] })
 *
 * // Restore from a commit
 * await git.restore("file.txt", { "--source": "HEAD~1" })
 *
 * // Restore both index and working tree
 * await git.restore("file.txt", {
 *   flags: ["--staged", "--worktree"],
 *   "--source": "HEAD~1",
 * })
 * ```
 *
 * @since 0.3.0
 */
export function restore(
  /**
   * @default "."
   */
  paths: string | string[] = ".",
  opts: RestoreOptions = {},
): Promise<string> {
  return utils.runCmd("restore", [
    ...utils.buildArgs(opts),
    ...(Array.isArray(paths) ? paths : [paths]),
  ])
}
