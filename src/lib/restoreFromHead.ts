import type { Api } from "../types/api"

/**
 * Restore files from `HEAD`, discarding both staged and unstaged changes.
 *
 * @example
 * ```ts
 * await git.restoreFromHead("file.txt")
 * ```
 *
 * @since 0.3.0
 */
export function restoreFromHead(
  this: Api,
  paths: string | string[],
): Promise<Api> {
  return this.restore(paths, { "--source": "HEAD" })
}
