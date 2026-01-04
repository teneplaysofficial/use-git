import type { Api } from "../types/api"

/**
 * Get a list of files that are currently staged.
 *
 * @returns Array of staged file paths
 *
 * @example
 * ```ts
 * const files = await git.getStagedFiles()
 * // ["src/index.ts"]
 * ```
 *
 * @see {@link stagedFileCount}
 * @see {@link diffStaged}
 *
 * @since 0.2.0
 */
export async function getStagedFiles(this: Api): Promise<string[]> {
  const res = await this.diff(undefined, undefined, {
    flags: ["--cached", "--name-only"],
  })

  return res
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
}
