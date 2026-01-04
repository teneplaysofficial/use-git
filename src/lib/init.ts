import utils from "../internal"
import type { Api } from "../types/api"
import type { InitOptions } from "./types/InitOptions"

/**
 * Create an empty Git repository or reinitialize an existing one
 *
 * {@link https://git-scm.com/docs/git-init}
 *
 * @since 0.1.0
 */
export async function init(this: Api, opts: InitOptions = {}): Promise<Api> {
  opts = utils.mergeOpts<InitOptions>(
    {
      "--initial-branch": "main",
    },
    opts,
  )

  await utils.runCmd("init", utils.buildArgs(opts))

  return this
}
