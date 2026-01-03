import utils from "../internal"
import type { Api } from "../types/api"

export interface CloneOptions {
  flags?: (
    | "--local"
    | "--no-hardlinks"
    | "--shared"
    | "--dissociate"
    | "--quiet"
    | "--progress"
    | "--no-checkout"
    | "--reject-shallow"
    | "--no-reject-shallow"
    | "--bare"
    | "--sparse"
    | "--also-filter-submodules"
    | "--mirror"
    | "--no-tags"
    | "--single-branch"
    | "--no-single-branch"
  )[]

  dir?: string

  "--filter"?: string

  "--origin"?: string

  "--branch"?: string

  "--revision"?: string

  "--upload-pack"?: string

  "--depth"?: number | string
}

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
