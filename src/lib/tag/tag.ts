import utils from "../../internal"
import type { TagOptions } from "../types/TagOptions"

/**
 * Create, list, delete or verify tags
 *
 * @example
 * ```ts
 * await tag()
 * // Lists all tags
 * ```
 *
 * @example
 * ```ts
 * await tag("v1.0.0")
 * // Same as: git tag v1.0.0
 * ```
 *
 * @example
 * ```ts
 * await tag("v1.0.0", {
 *   "--message": "Initial stable release",
 * })
 * ```
 *
 * @since 1.0.0
 */
export function tag(opts?: TagOptions): Promise<string>
export function tag(tagName: string, opts?: TagOptions): Promise<string>

export function tag(
  tagNameOrOpts?: string | TagOptions,
  opts: TagOptions = {},
): Promise<string> {
  let tagName = ""

  if (typeof tagNameOrOpts === "object" || tagNameOrOpts === undefined) {
    opts = tagNameOrOpts || {}
  } else {
    tagName = tagNameOrOpts
  }

  return utils.runCmd("tag", [tagName, ...utils.buildArgs(opts)])
}
