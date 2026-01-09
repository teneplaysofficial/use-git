import { commit } from "./commit"

/**
 * Create an empty commit.
 *
 * @example
 * ```ts
 * await git.commitEmpty("chore: trigger CI")
 * ```
 *
 * @since 0.3.0
 */
export function commitEmpty(message: string): Promise<string> {
  return commit(message, {
    flags: ["--allow-empty"],
  })
}
