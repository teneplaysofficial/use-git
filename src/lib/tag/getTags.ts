import { tag } from "./tag"

/**
 *
 * @example
 * ```ts
 * await getTags();
 * // [ 'v0.1.0', 'v0.2.0', 'v0.3.0' ]
 * ```
 *
 * @since 1.0.0
 */
export async function getTags(): Promise<string[]> {
  const res = await tag({ flags: ["--list"] })

  return res.split("\n")
}
