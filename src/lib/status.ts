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

/**
 * Check whether the working tree contains untracked files.
 *
 * @summary
 * - This method detects files that are present in the working tree but are not yet tracked by Git.
 * - To get files use {@link getUntrackedFiles}.
 *
 *
 * @example
 * ```ts
 * if (await git.hasUntrackedFiles()) {
 *   console.log("There are untracked files in the working tree")
 * }
 * ```
 *
 * @since 0.2.0
 */
export async function hasUntrackedFiles(this: Api): Promise<boolean> {
  return (await this.getUntrackedFiles()).length > 0
}

/**
 * Get the working tree contains untracked files.
 *
 * @example
 * ```ts
 * const untracked = await git.hasUntrackedFiles()
 *
 * if (await git.hasUntrackedFiles()) {
 *   console.log("There are untracked files in the working tree")
 * }
 *
 * if (untracked.length > 0) {
 *   console.log("Untracked files:", untracked.join(", "))
 * }
 * ```
 *
 * @since 0.2.0
 */
export async function getUntrackedFiles(this: Api): Promise<string[]> {
  const res = await this.status(undefined, {
    flags: ["--porcelain", "--untracked-files=normal"],
  })

  return res
    .split("\n")
    .filter((l) => l.startsWith("?? "))
    .map((l) => l.slice(3))
}
