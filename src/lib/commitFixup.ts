import type { Api } from "../types/api"

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
export async function commitFixup(this: Api, commit: string): Promise<Api> {
  await this.commit(undefined, {
    "--fixup": commit,
  })

  return this
}
