import utils from "../internal"
import type { Api } from "../types/api"
import type { StatusOptions } from "./types/StatusOptions"

/**
 * Show the working tree status.
 *
 * @example
 * ```ts
 * // Default, human-readable output
 * await git.status()
 *
 * // Short format with branch info
 * await git.status(undefined, {
 *   flags: ["--short", "--branch"],
 * })
 *
 * // Machine-readable output (recommended for tooling)
 * await git.status(undefined, {
 *   flags: ["--porcelain"],
 * })
 *
 * // Limit status to specific paths
 * await git.status(["src", "package.json"])
 * ```
 *
 * @since 0.1.0
 */
export function status(
  this: Api,
  /**
   * Optional pathspecs used to limit the status output to specific files or directories.
   */
  paths?: readonly string[],
  /**
   * Additional status options and flags.
   */
  opts: StatusOptions = {},
): Promise<string> {
  return utils.runCmd("status", [...utils.buildArgs(opts), ...(paths ?? [])])
}
