import utils from "../../internal"
import type { CommitOptions } from "../types"

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
export function commit(
  message: string | undefined,
  description?: string,
): Promise<string>
export function commit(
  message: string | undefined,
  opts?: CommitOptions,
): Promise<string>
export function commit(
  message: string | undefined,
  description?: string,
  opts?: CommitOptions,
): Promise<string>

export function commit(
  message: string | undefined,
  descOrOpts?: string | CommitOptions,
  opts: CommitOptions = {},
): Promise<string> {
  let description: string | undefined
  let options: CommitOptions = opts

  if (typeof descOrOpts === "string") {
    description = descOrOpts
  } else if (typeof descOrOpts === "object") {
    options = descOrOpts
  }

  return utils.runCmd(
    "commit",
    [
      ...utils.buildArgs(options),
      ...(message ? ["-m", message] : []),
      ...(description ? ["-m", description] : []),
    ].filter(Boolean),
  )
}
