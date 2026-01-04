import type { Api } from "../types/api"

/**
 * Get the number of staged files.
 *
 * @returns Total count of staged files
 *
 * @example
 * ```ts
 * const count = await git.stagedFileCount()
 * ```
 *
 * @see {@link getStagedFiles}
 *
 * @since 0.2.0
 */
export async function stagedFileCount(this: Api): Promise<number> {
  const files = await this.getStagedFiles()

  return files.length
}
