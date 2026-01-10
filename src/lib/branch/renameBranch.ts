import utils from "../../internal"
import { branch } from "./branch"
import { branchExists } from "./branchExists"

/**
 * Rename an existing branch.
 *
 * @example
 * ```ts
 * await renameBranch("old-name", "new-name")
 *
 * // Force rename a branch
 * await renameBranch("old-name", "new-name", { force: true })
 * ```
 *
 * @since 1.0.0
 */
export async function renameBranch(
  from: string,
  to: string,
  opts: {
    /**
     * Force rename a branch.
     *
     * @default false
     */
    force?: boolean
  } = {},
): Promise<string> {
  opts = utils.mergeOpts({ force: false }, opts)

  if (!opts.force && (await branchExists(to))) {
    throw new Error(
      `Cannot rename branch "${from}" to "${to}": a branch named "${to}" already exists. Use { force: true } to overwrite it.`,
    )
  }

  return branch([from, to], {
    flags: [opts.force ? "-M" : "--move"],
  })
}
