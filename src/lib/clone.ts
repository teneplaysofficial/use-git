import utils from "../internal"
import type { Api } from "../types/api"
import type { CloneOptions } from "./types/CloneOptions"

/**
 * Clone a repository into a new directory
 *
 * @since 0.1.0
 */
export async function clone(
  this: Api,
  repo: string,
  opts: CloneOptions = {},
): Promise<Api> {
  await utils.runCmd("clone", [...utils.buildArgs(opts), repo, opts.dir])

  return this
}
