/**
 * Checks whether a given string conforms to a Semantic Version (SemVer) tag format.
 *
 * Supports:
 * - Optional `v` prefix (e.g. `v1.2.3`)
 * - Standard `MAJOR.MINOR.PATCH` versions
 * - Optional pre-release identifiers (e.g. `-alpha`, `-beta.1`)
 *
 * Does NOT validate:
 * - Build metadata (`+build`)
 * - Strict SemVer edge cases (kept intentionally lightweight)
 *
 * @returns `true` if the tag matches a SemVer-compatible format, otherwise `false`.
 *
 * @example
 * ```ts
 * isSemverTag("v1.0.0");        // true
 * isSemverTag("1.2.3");         // true
 * isSemverTag("1.2.3-alpha");   // true
 * ```
 *
 * @example
 * ```ts
 * isSemverTag("v1");            // false
 * isSemverTag("version-1.0.0"); // false
 * ```
 *
 * @since 1.0.0
 */
export function isSemverTag(
  /**
   * The tag name to check.
   */
  tag: string,
): boolean {
  return /^v?\d+\.\d+\.\d+(-[\w.-]+)?$/.test(tag)
}
