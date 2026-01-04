import utils from "../internal"
import type { Api } from "../types/api"
import type { AddOptions } from "./types/AddOptions"

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
