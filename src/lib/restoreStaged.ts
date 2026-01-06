import type { Api } from "../types/api"

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
export function restoreStaged(
  this: Api,
  paths: string | string[],
): Promise<Api> {
  return this.restore(paths, { flags: ["--staged"] })
}
