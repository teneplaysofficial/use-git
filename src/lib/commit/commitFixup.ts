import { commit } from "./commit"

/**
 * Create a fixup commit for autosquash.
 *
 * @example
 * ```ts
 * await git.commitFixup("abc123")
 * ```
 *
 * @since 0.3.0
 */
export function commitFixup(commitId: string): Promise<string> {
  return commit(undefined, {
    "--fixup": commitId,
  })
}
