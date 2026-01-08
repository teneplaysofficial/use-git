import type { Api } from "../types/api"

/**
 * Restore all working tree files from the index.
 *
 * @summary
 * This discards **all unstaged changes** in the working tree, restoring files to their last staged state.
 *
 * @example
 * ```ts
 * await git.restoreAll()
 * ```
 *
 * @since 0.3.0
 */
export function restoreAll(this: Api): Promise<Api> {
  return this.restore()
}
