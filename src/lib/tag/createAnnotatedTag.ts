import utils from "../../internal"
import type { TagOptions } from "../types"
import { tag } from "./tag"

/**
 * Creates an annotated Git tag with a message.
 *
 * Annotated tags are stored as full objects in Git and typically include the tagger name, email, date, and a message.
 *
 * @example
 * ```ts
 * await createAnnotatedTag("v1.0.0", "Initial stable release")
 * ```
 *
 * @example
 * ```ts
 * createAnnotatedTag("release-2024", "Production release for 2024")
 *   .then(output => console.log(output))
 *   .catch(error => console.error(error))
 * ```
 *
 * @example
 * ```ts
 * await createAnnotatedTag(
 *   "v1.0.0",
 *   "Re-tagged after hotfix",
 *   { force: true }
 * )
 * ```
 *
 * @since 1.0.0
 */
export function createAnnotatedTag(
  /**
   * The name of the tag to create.
   *
   * @example "v1.0.0"
   * @example "release-2024"
   */
  tagName: string,
  /**
   * The annotation message for the tag.
   *
   * @example "Initial stable release"
   * @example "Production release for 2024"
   */
  message: string,
  opts: {
    /**
     * Whether to forcibly replace an existing tag.
     *
     * @default false
     */
    force?: boolean
  } = {},
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
    "--message": message,
  })
}
