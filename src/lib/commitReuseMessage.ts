import type { Api } from "../types/api"

/**
 * Reuse the commit message and authorship from an existing commit.
 *
 * @example
 * ```ts
 * await git.commitReuseMessage("abc123")
 * ```
 *
 * @since 0.3.0
 */
export async function commitReuseMessage(
  this: Api,
  commit: string,
): Promise<Api> {
  await this.commit(undefined, {
    "--reuse-message": commit,
  })

  return this
}
