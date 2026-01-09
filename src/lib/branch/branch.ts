import utils from "../../internal"
import type { BranchOptions } from "../types"

/**
 * List, create, or delete branches.
 *
 * @since 1.0.0
 */
export function branch(opts: BranchOptions = {}): Promise<string> {
  return utils.runCmd("branch", utils.buildArgs(opts))
}
