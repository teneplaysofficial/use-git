import { commit } from "./commit"

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
export function commitSignoff(
  message: string,
  description?: string,
): Promise<string> {
  return commit(message, description, {
    flags: ["--signoff"],
  })
}
