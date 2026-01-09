import utils from "../../internal"
import type { InitOptions } from "../types"

/**
 * Create an empty Git repository or reinitialize an existing one
 *
 * {@link https://git-scm.com/docs/git-init}
 *
 * @since 0.1.0
 */
export function init(opts: InitOptions = {}): Promise<string> {
  opts = utils.mergeOpts<InitOptions>(
    {
      "--initial-branch": "main",
    },
    opts,
  )

  return utils.runCmd("init", utils.buildArgs(opts))
}
