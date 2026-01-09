import { restore } from "./restore"

/**
 * Restore files in the index (staging area) to match HEAD.
 *
 * @example
 * ```ts
 * await git.restoreStaged("file.txt")
 * ```
 *
 * @since 0.3.0
 */
export function restoreStaged(paths: string | string[]): Promise<string> {
  return restore(paths, { flags: ["--staged"] })
}
