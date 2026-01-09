import { commit } from "./commit"

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
export function commitReuseMessage(commitId: string): Promise<string> {
  return commit(undefined, {
    "--reuse-message": commitId,
  })
}
