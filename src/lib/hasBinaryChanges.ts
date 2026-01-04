import type { Api } from "../types/api"

/**
 * Check whether the diff contains binary file changes.
 *
 * @returns `true` if binary changes are present
 *
 * @example
 * ```ts
 * if (await git.hasBinaryChanges()) {
 *   console.log("Binary file changes present")
 * }
 * ```
 *
 * @since 0.2.0
 */
export async function hasBinaryChanges(this: Api): Promise<boolean> {
  const res = await this.diff(undefined, undefined, {
    flags: ["--numstat"],
  })

  return res.split("\n").some((line) => line.startsWith("-\t-"))
}
