import { status } from "./status"

/**
 * Get a list of untracked files in the working tree.
 *
 * @example
 * ```ts
 * const untracked = await git.getUntrackedFiles()
 *
 * if (untracked.length > 0) {
 *   console.log("Untracked files:", untracked.join(", "))
 * }
 * ```
 *
 * @since 0.2.0
 */
export async function getUntrackedFiles(): Promise<string[]> {
  const res = await status(undefined, {
    flags: ["--porcelain", "--untracked-files=normal"],
  })

  return res
    .split("\n")
    .filter((l) => l.startsWith("?? "))
    .map((l) => l.slice(3))
}
