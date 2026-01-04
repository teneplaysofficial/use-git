import type { Api } from "../types/api"

/**
 * Get the number of files changed in the working tree.
 *
 * @returns Number of changed files
 *
 * @example
 * ```ts
 * const count = await git.changedFileCount()
 * console.log(count)
 * ```
 *
 * @see {@link getChangedFiles}
 *
 * @since 0.2.0
 */
export async function changedFileCount(this: Api): Promise<number> {
  const res = await this.getChangedFiles()
  return res.length
}
