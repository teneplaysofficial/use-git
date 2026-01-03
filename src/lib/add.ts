import utils from "../internal"
import type { Api } from "../types/api"

export interface AddOptions {
  flags?: (
    | "--dry-run"
    | "--force"
    | "--sparse"
    | "--update"
    | "--all"
    | "--ignore-removal"
    | "--intent-to-add"
    | "--refresh"
    | "--ignore-errors"
    | "--ignore-missing"
    | "--renormalize"
    | "--chmod=+x"
    | "--chmod=-x"
  )[]
}

/**
 * Add file contents to the index.
 *
 * @since 0.1.0
 */
export async function add(
  this: Api,
  args: "." | readonly string[] = ".",
  opts: AddOptions = {},
): Promise<Api> {
  await utils.runCmd("add", [
    ...utils.buildArgs(opts),
    ...(Array.isArray(args) ? args : [args]),
  ])

  return this
}
