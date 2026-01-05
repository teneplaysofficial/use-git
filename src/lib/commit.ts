import utils from "../internal"
import type { Api } from "../types/api"
import type { CommitOptions } from "./types/CommitOptions"

/**
 * Record changes to the repository.
 *
 * @example
 * ```ts
 * await git.add()
 * await git.commit("feat: add new API")
 *
 * await git.commit(
 *   "fix: handle empty input",
 *   "This fixes a bug where empty input caused a crash.",
 * )
 *
 * await git.commit("chore: release", { flags: ["--amend"] })
 *
 * await git.commit(
 *   "feat: improve API",
 *   "Adds better typing and docs.",
 *   { flags: ["--signoff"] },
 * )
 * ```
 *
 * @see {@link add}
 *
 * @since 0.3.0
 */
export async function commit(
  this: Api,
  message: string | undefined,
  description?: string,
): Promise<Api>
export async function commit(
  this: Api,
  message: string | undefined,
  opts?: CommitOptions,
): Promise<Api>
export async function commit(
  this: Api,
  message: string | undefined,
  description?: string,
  opts?: CommitOptions,
): Promise<Api>

export async function commit(
  this: Api,
  message: string | undefined,
  descOrOpts?: string | CommitOptions,
  opts: CommitOptions = {},
): Promise<Api> {
  let description: string | undefined
  let options: CommitOptions = opts

  if (typeof descOrOpts === "string") {
    description = descOrOpts
  } else if (typeof descOrOpts === "object") {
    options = descOrOpts
  }

  await utils.runCmd(
    "commit",
    [
      ...utils.buildArgs(options),
      ...(message ? [`-m ${message}`] : []),
      ...(description ? [`-m ${description}`] : []),
    ].filter(Boolean),
  )

  return this
}
