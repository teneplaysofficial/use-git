import { commit } from "./commit"

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
export function commitAmend(
  message?: string,
  description?: string,
): Promise<string> {
  return commit(message, description, {
    flags: ["--amend"],
  })
}
