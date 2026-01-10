import utils from "../../internal"
import type { CloneOptions } from "../types"

/**
 * Clone a repository into a new directory
 *
 * @since 0.1.0
 */
export function clone(repo: string, opts: CloneOptions = {}): Promise<string> {
  return utils.runCmd("clone", [...utils.buildArgs(opts), repo, opts.dir])
}
