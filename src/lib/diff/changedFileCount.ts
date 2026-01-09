import { getChangedFiles } from "./getChangedFiles"

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
export async function changedFileCount(): Promise<number> {
  const res = await getChangedFiles()

  return res.length
}
