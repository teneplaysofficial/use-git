import { restore } from "./restore"

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
export function restoreAllStaged(): Promise<string> {
  return restore(".", { flags: ["--staged"] })
}
