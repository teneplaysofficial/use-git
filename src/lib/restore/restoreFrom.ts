import { restore } from "./restore"

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
  source: string,
  paths: string | string[],
): Promise<string> {
  return restore(paths, { "--source": source })
}
