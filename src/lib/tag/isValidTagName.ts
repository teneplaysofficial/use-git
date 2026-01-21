/**
 * Determines whether a string is a valid and safe Git tag name.
 *
 * This function follows Git reference naming rules and prevents tag names that would be rejected by Git or cause ambiguous behavior.
 *
 * Invalid cases include:
 * - Empty strings
 * - Reserved name `@`
 * - Names ending with `.lock`
 * - Names starting or ending with `/`
 * - Consecutive slashes (`//`)
 * - Parent directory references (`..`)
 * - Whitespace or forbidden characters
 *
 * @returns `true` if the name is a valid Git tag name, otherwise `false`.
 *
 * @example
 * ```ts
 * isValidTagName("v1.0.0");     // true
 * isValidTagName("release-1"); // true
 * ```
 *
 * @example
 * ```ts
 * isValidTagName("v 1.0.0");   // false
 * isValidTagName("../v1");     // false
 * isValidTagName("@");         // false
 * isValidTagName("tag.lock");  // false
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
  if (!name) return false
  if (name === "@") return false
  if (name.endsWith(".lock")) return false
  if (name.startsWith("/") || name.endsWith("/")) return false
  if (name.includes("..") || name.includes("//")) return false
  if (/[~^:?*[\]\\\s]/.test(name)) return false

  return true
}
