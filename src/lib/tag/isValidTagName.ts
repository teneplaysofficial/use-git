/**
 * Determines whether a string is a valid and safe Git tag name.
 *
 * This function follows Git reference naming rules and prevents tag names that would be rejected by Git or cause ambiguous behavior.
 *
 * Invalid cases include:
 * - Empty strings
 * - Reserved name `@`
 * - Names containing the sequence `@{`
 * - Names ending with `.lock` or `.`
 * - Names starting or ending with `/`
 * - Consecutive slashes (`//`)
 * - Parent or current directory references (`..`, `/.`, or segments starting with `.`)
 * - Whitespace or forbidden characters (`~ ^ : ? * [ ] \`)
 *
 * @returns `true` if the name is a valid Git tag name, otherwise `false`.
 *
 * @example
 * ```ts
 * isValidTagName("v1.0.0");     // true
 * isValidTagName("release-1"); // true
 * isValidTagName("feature/v2");   // true
 * ```
 *
 * @example
 * ```ts
 * isValidTagName("v 1.0.0");   // false
 * isValidTagName("../v1");     // false
 * isValidTagName("@");         // false
 * isValidTagName("tag.lock");  // false
 * isValidTagName("feature//x");   // false
 * ```
 *
 * @example
 * ```ts
 * const tags = [
 *   "v1.0.0",
 *   "release-2025",
 *   "feature/v2",
 *   "@",
 *   "../v1",
 *   "tag.lock",
 *   "v 1.0.0",
 *   "/start",
 *   "end/",
 *   "feature//x",
 * ]
 *
 * for (const tag of tags) {
 *   console.log(`${tag.padEnd(15)} →`, isValidTagName(tag))
 * }
 *
 * // Output:
 * // v1.0.0         → true
 * // release-2025  → true
 * // feature/v2    → true
 * // @             → false
 * // ../v1         → false
 * // tag.lock      → false
 * // v 1.0.0       → false
 * // /start        → false
 * // end/          → false
 * // feature//x    → false
 * ```
 *
 * @since 1.0.0
 */
export function isValidTagName(
  /**
   * The tag name to validate.
   */
  name: string,
): boolean {
  return !(
    !name ||
    name === "@" ||
    name.includes("@{") ||
    name.endsWith(".lock") ||
    name.endsWith(".") ||
    name.startsWith("/") ||
    name.endsWith("/") ||
    name.includes("..") ||
    name.includes("//") ||
    /(^|\/)\./.test(name) ||
    /[~^:?*[\]\\\s]/.test(name)
  )
}
