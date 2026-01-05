import type { Api } from "../types/api"

/**
 * Commit all tracked changes.
 *
 * @example
 * ```ts
 * await git.commitAll("chore: update deps")
 * ```
 *
 * @since 0.3.0
 */
export async function commitAll(
  this: Api,
  message: string,
  description?: string,
): Promise<Api> {
  await this.commit(message, description, {
    flags: ["--all"],
  })

  return this
}
