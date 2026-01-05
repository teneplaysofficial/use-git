import type { Api } from "../types/api"

/**
 * Amend last commit without editing the message.
 *
 * @example
 * ```ts
 * await git.commitNoEdit()
 * ```
 *
 * @since 0.3.0
 */
export async function commitNoEdit(this: Api): Promise<Api> {
  await this.commit(undefined, {
    flags: ["--amend", "--no-edit"],
  })

  return this
}
