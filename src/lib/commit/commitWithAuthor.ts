import { commit } from "./commit"

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
export function commitWithAuthor(
  message: string,
  author: string,
  description?: string,
): Promise<string> {
  return commit(message, description, {
    "--author": author,
  })
}
