import { diff } from "./diff"
import { hasDiff } from "./hasDiff"

/**
 * Check whether all changes are end-of-line only (CRLF ↔ LF).
 *
 * @returns `true` if all changes are EOL-only
 *
 * @example
 * ```ts
 * if (await git.hasOnlyEOLChanges()) {
 *   console.log("Only EOL changes detected")
 * }
 * ```
 *
 * @since 0.2.0
 */
export async function hasOnlyEOLChanges(): Promise<boolean> {
  const hasChanges = await hasDiff()
  if (!hasChanges) return false

  try {
    await diff(undefined, undefined, {
      flags: ["--ignore-cr-at-eol", "--quiet"],
    })

    return true
  } catch (err) {
    if (err instanceof Error && "exitCode" in err && err.exitCode === 1) {
      return false
    }

    throw err
  }
}
