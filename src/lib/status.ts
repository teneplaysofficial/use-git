import utils from "../internal"
import type { Api } from "../types/api"

/**
 * Options for {@link status}.
 */
export interface StatusOptions {
  /**
   * Flags passed directly to `git status`.
   */
  flags?: (
    | "--short"
    | "--branch"
    | "--show-stash"
    | "--porcelain"
    | "--porcelain=v2"
    | "--long"
    | "--verbose"
    | "--ignored"
    | "--untracked-files=no"
    | "--untracked-files=normal"
    | "--untracked-files=all"
    | "--ignore-submodules=none"
    | "--ignore-submodules=untracked"
    | "--ignore-submodules=dirty"
    | "--ignore-submodules=all"
    | "--ahead-behind"
    | "--no-ahead-behind"
  )[]
}

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

/**
 * Options for {@link isDirty}.
 */
export interface IsDirtyOptions {
  /**
   * Ignore untracked files.
   *
   * @summary
   * When enabled, only tracked file changes (modified, staged, or deleted) will be considered.
   *
   * @default false
   */
  trackedOnly?: boolean
}

/**
 * Check whether the working tree has uncommitted changes.
 *
 * @example
 * ```ts
 * // Check if the working tree has any changes (tracked + untracked)
 * await git.isDirty()
 *
 * // Check only tracked file modifications
 * await git.isDirty({ trackedOnly: true })
 * ```
 *
 * @since 0.1.0
 */
export async function isDirty(
  this: Api,
  /**
   * Options controlling how the dirty state is evaluated.
   */
  opts: IsDirtyOptions = {},
): Promise<string> {
  opts = utils.mergeOpts<IsDirtyOptions>(
    {
      trackedOnly: false,
    },
    opts,
  )

  const flags: StatusOptions["flags"] = ["--porcelain"]

  if (opts.trackedOnly) flags.push("--untracked-files=no")

  const res = await this.status(undefined, {
    flags,
  })

  return res
}
