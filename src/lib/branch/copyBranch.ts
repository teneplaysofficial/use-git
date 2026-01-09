import utils from "../../internal"
import { branch } from "./branch"

/**
 * Copy a branch.
 *
 * @example
 * ```ts
 * await copyBranch("main", "backup-main")
 *
 * // Force copy a branch
 * await copyBranch("main", "backup-main", { force: true })
 * ```
 *
 * @since 1.0.0
 */
export function copyBranch(
  source: string,
  target: string,
  opts: {
    /**
     * Force copy a branch.
     *
     * @default false
     */
    force?: boolean
  } = {},
): Promise<string> {
  opts = utils.mergeOpts({ force: false }, opts)

  return branch([source, target], {
    flags: [opts.force ? "-C" : "--copy"],
  })
}
