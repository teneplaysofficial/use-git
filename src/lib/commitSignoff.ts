import type { Api } from "../types/api"

/**
 * Commit with Signed-off-by trailer.
 *
 * @example
 * ```ts
 * await git.commitSignoff("feat: add API")
 * ```
 *
 * @since 0.3.0
 */
export async function commitSignoff(
  this: Api,
  message: string,
  description?: string,
): Promise<Api> {
  await this.commit(message, description, {
    flags: ["--signoff"],
  })

  return this
}
