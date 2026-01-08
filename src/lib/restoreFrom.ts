import type { Api } from "../types/api"

/**
 * Restore a file from a specific commit.
 *
 * @example
 * ```ts
 * await git.restoreFrom("HEAD~1", "src/index.ts")
 * ```
 *
 * @since 0.3.0
 */
export function restoreFrom(
  this: Api,
  source: string,
  paths: string | string[],
): Promise<Api> {
  return this.restore(paths, { "--source": source })
}
