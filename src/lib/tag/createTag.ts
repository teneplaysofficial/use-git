import utils from "../../internal"
import { tag } from "../tag"
import type { CreateTagOptions, TagOptions } from "../types"

/**
 * Creates a lightweight Git tag.
 *
 * @example
 * ```ts
 * await createTag("v1.0.0")
 * // Same as: git tag v1.0.0
 * ```
 *
 * @example
 * ```ts
 * createTag("hotfix-1")
 *   .then(output => console.log(output))
 *   .catch(error => console.error(error))
 * ```
 *
 * @example
 * ```ts
 * await createTag("v1.0.0", { force: true })
 * // Same as: git tag -f v1.0.0
 * ```
 *
 * @since 1.0.0
 */
export function createTag(
  /**
   * The name of the tag to create.
   *
   * @example "v1.0.0"
   * @example "hotfix-1"
   */
  tagName: string,
  opts: CreateTagOptions = {},
): Promise<string> {
  opts = utils.mergeOpts(
    {
      force: false,
    },
    opts,
  )

  const flags: NonNullable<TagOptions["flags"]> = []

  if (opts.force) {
    flags.push("--force")
  }

  return tag(tagName, {
    flags,
  })
}
