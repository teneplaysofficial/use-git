import { commit } from "./commit"

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
export function commitAll(
  message: string,
  description?: string,
): Promise<string> {
  return commit(message, description, {
    flags: ["--all"],
  })
}
