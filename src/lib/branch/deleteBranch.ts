import utils from "../../internal"
import { branch } from "./branch"

/**
 * Delete a branch.
 *
 * @example
 * ```ts
 * await deleteBranch("feature/login")
 *
 * // Force delete a branch.
 * await deleteBranch("feature/login", { force: true })
 * ```
 *
 * @since 1.0.0
 */
export function deleteBranch(
  name: string,
  opts: {
    /**
     * Force delete a branch.
     *
     * @default false
     */
    force?: boolean
  } = {},
): Promise<string> {
  opts = utils.mergeOpts({ force: false }, opts)

  return branch(name, {
    flags: [opts.force ? "-D" : "--delete"],
  })
}
