import type { Api } from "../types/api"

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
export async function commitEmpty(this: Api, message: string): Promise<Api> {
  await this.commit(message, {
    flags: ["--allow-empty"],
  })

  return this
}
