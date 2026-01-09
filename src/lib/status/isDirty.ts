import utils from "../../internal"
import type { IsDirtyOptions } from "../types/IsDirtyOptions"
import type { StatusOptions } from "../types/StatusOptions"
import { status } from "./status"

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

  const res = await status(undefined, {
    flags,
  })

  return res
}
