import { commit } from "./commit"

/**
 * Amend last commit without editing the message.
 *
 * @example
 * ```ts
 * await git.commitNoEdit()
 * ```
 *
 * @since 0.3.0
 */
export function commitNoEdit(): Promise<string> {
  return commit(undefined, {
    flags: ["--amend", "--no-edit"],
  })
}
