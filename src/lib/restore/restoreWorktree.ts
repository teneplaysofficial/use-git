import { restore } from "./restore"

/**
 * Restore files in the working tree from the index.
 *
 * @example
 * ```ts
 * await git.restoreWorktree("file.txt")
 * ```
 *
 * @since 0.3.0
 */
export function restoreWorktree(paths: string | string[]): Promise<string> {
  return restore(paths, { flags: ["--worktree"] })
}
