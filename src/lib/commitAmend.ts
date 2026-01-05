import type { Api } from "../types/api"

/**
 * Amend the last commit.
 *
 * @example
 * ```ts
 * await git.commitAmend("fix: typo")
 * ```
 *
 * @since 0.3.0
 */
export async function commitAmend(
  this: Api,
  message?: string,
  description?: string,
): Promise<Api> {
  await this.commit(message, description, {
    flags: ["--amend"],
  })

  return this
}
