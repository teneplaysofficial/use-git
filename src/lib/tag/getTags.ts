import utils from "../../internal"
import { tag } from "./tag"

/**
 * Retrieves all Git tags from the current repository.
 *
 * @example
 * ```ts
 * await getTags();
 * // [ 'v0.1.0', 'v0.2.0', 'v0.3.0' ]
 *
 * await getTags(['v'], 'version-');
 * // ['version-0.1.0', 'version-0.2.0']
 * ```
 *
 * @since 1.0.0
 */
export async function getTags(
  /**
   * Optional list of prefixes to remove or replace from the beginning of each tag
   */
  prefixes: string[] = [],
  /**
   * Replacement value for matched prefixes
   *
   * @default ""
   */
  to = "",
): Promise<string[]> {
  const res = await tag({ flags: ["--list"] })

  return utils.makeList(res, prefixes, to)
}
