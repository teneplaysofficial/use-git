import { tag } from "./tag"

/**
 * Deletes a local Git tag.
 *
 * @example
 * ```ts
 * await deleteTag("v1.0.0")
 * // Deletes the local tag `v1.0.0`
 * ```
 *
 * @example
 * ```ts
 * deleteTag("release-2024")
 *   .then(output => console.log(output))
 *   .catch(error => console.error(error))
 * ```
 *
 * @since 1.0.0
 */
export function deleteTag(
  /**
   * The name of the tag to delete.
   *
   * @example "v1.0.0"
   * @example "release-2024"
   */
  tagName: string,
): Promise<string> {
  return tag({ "--delete": tagName })
}
