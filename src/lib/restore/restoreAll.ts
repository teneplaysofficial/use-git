import { restore } from "./restore"

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
export function restoreAll(): Promise<string> {
  return restore()
}
