import type { Api } from "../types/api"

/**
 * Commit with explicit author.
 *
 * @example
 * ```ts
 * await git.commitWithAuthor(
 *   "feat: initial import",
 *   "Alice <alice@example.com>",
 * )
 * ```
 *
 * @since 0.3.0
 */
export async function commitWithAuthor(
  this: Api,
  message: string,
  author: string,
  description?: string,
): Promise<Api> {
  await this.commit(message, description, {
    "--author": author,
  })

  return this
}
