/**
 * Options for {@link restore}
 */
export interface RestoreOptions {
  flags?: (
    | "--staged"
    | "--worktree"
    | "--patch"
    | "--quiet"
    | "--progress"
    | "--no-progress"
    | "--ours"
    | "--theirs"
    | "--merge"
    | "--ignore-unmerged"
    | "--overlay"
    | "--no-overlay"
    | "--recurse-submodules"
    | "--no-recurse-submodules"
  )[]

  /**
   * Restore files from a specific source (commit, branch, tag).
   *
   * @example
   * "HEAD"
   * "main"
   * "HEAD~1"
   */
  "--source"?: string

  /**
   * Restore with a specific conflict style.
   *
   * @default "merge"
   */
  "--conflict"?: "merge" | "diff3" | "zdiff3"

  /**
   * Generate diffs with N lines of context (used with --patch).
   */
  "--unified"?: number
}
