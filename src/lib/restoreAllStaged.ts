import type { Api } from "../types/api"

/**
 * Restore all staged files back to HEAD, keeping working tree changes.
 *
 * @example
 * ```ts
 * await git.restoreAllStaged()
 * ```
 *
 * @since 0.3.0
 */
export function restoreAllStaged(this: Api): Promise<Api> {
  return this.restore(".", { flags: ["--staged"] })
}
