import utils from "../internal"
import type { Api } from "../types/api"

export interface InitOptions {
  flags?: ("--quiet" | "--bare")[]

  /**
   * Use branch-name for the initial branch in the newly created repository.
   *
   * @default "main"
   */
  "--initial-branch"?: "main" | "master"

  /**
   * Specify the directory from which templates will be used.
   */
  "--template"?: string

  /**
   * Hash algorithm.
   *
   * @default "sha1"
   */
  "--object-format"?: "sha1" | "sha256"

  /**
   * @default ".git"
   */
  "--separate-git-dir"?: string
}

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
