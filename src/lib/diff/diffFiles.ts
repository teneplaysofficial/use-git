import { diff } from "./diff"

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
  /**
   * First file path.
   */
  fileA: string,
  /**
   * Second file path.
   */
  fileB: string,
): Promise<string> {
  return diff([fileA, fileB], undefined, {
    flags: ["--no-index"],
  })
}
