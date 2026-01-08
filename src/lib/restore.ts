import utils from "../internal"
import type { Api } from "../types/api"
import type { RestoreOptions } from "./types/RestoreOptions"

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
export async function restore(
  this: Api,
  /**
   * @default "."
   */
  paths: string | string[] = ".",
  opts: RestoreOptions = {},
): Promise<Api> {
  await utils.runCmd("restore", [
    ...utils.buildArgs(opts),
    ...(Array.isArray(paths) ? paths : [paths]),
  ])

  return this
}
