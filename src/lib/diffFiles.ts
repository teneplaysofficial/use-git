import type { Api } from "../types/api"

/**
 * Compare two files directly, even if they are outside a Git repository.
 *
 * @example
 * ```ts
 * await git.diffFiles("a.txt", "b.txt")
 * ```
 *
 * @since 0.2.0
 */
export function diffFiles(
  this: Api,
  /**
   * First file path.
   */
  fileA: string,
  /**
   * Second file path.
   */
  fileB: string,
): Promise<string> {
  return this.diff([fileA, fileB], undefined, {
    flags: ["--no-index"],
  })
}
