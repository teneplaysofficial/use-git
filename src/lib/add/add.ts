import utils from "../../internal"
import type { AddOptions } from "../types/AddOptions"

/**
 * Add file contents to the index.
 *
 * @since 0.1.0
 */
export function add(
  args: "." | readonly string[] = ".",
  opts: AddOptions = {},
): Promise<string> {
  return utils.runCmd("add", [
    ...utils.buildArgs(opts),
    ...(Array.isArray(args) ? args : [args]),
  ])
}
