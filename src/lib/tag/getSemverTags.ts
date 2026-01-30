import { getTags } from "./getTags"
import { isSemverTag } from "./isSemverTag"

/**
 * Retrieves all Git tags from the repository and filters only those that follow a Semantic Version (SemVer) format.
 *
 * Internally, it:
 * 1. Fetches all tags
 * 2. Filters them using {@link isSemverTag}
 *
 * @returns A promise that resolves to an array of SemVer-compliant tag names.
 *
 * @example
 * ```ts
 * await getSemverTags();
 * // ['v1.0.0', 'v1.1.0', '2.0.0']
 * ```
 *
 * @since 1.0.0
 */
export async function getSemverTags(): Promise<string[]> {
  const res = await getTags()

  return res.filter(isSemverTag)
}
