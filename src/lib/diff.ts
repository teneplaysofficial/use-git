import utils from "../internal"
import type { Api } from "../types/api"
import { parseNumStat } from "./utils/parseNumStat"

/**
 * Options for {@link diff}.
 */
export interface DiffOptions {
  flags?: (
    | "--patch"
    | "--stat"
    | "--numstat"
    | "--shortstat"
    | "--name-only"
    | "--name-status"
    | "--cached"
    | "--merge-base"
    | "--no-index"
    | "--raw"
    | "--quiet"
    | "--ignore-all-space"
    | "--ignore-space-at-eol"
    | "--ignore-cr-at-eol"
  )[]
}

/**
 * Show changes between commits, commit and working tree, etc.
 *
 * @example
 * ```ts
 * await git.diff()
 * await git.diff({ flags: ["--stat"] })
 * await git.diff(["HEAD~1", "HEAD"])
 * await git.diff(undefined, ["src"])
 * ```
 *
 * @see {@link diffWorkingTree}
 * @see {@link diffStaged}
 * @see {@link diffCommits}
 *
 * @since 0.2.0
 */
export function diff(
  this: Api,
  /**
   * Optional commit refs or ranges.
   *
   * @example
   * - "HEAD"
   * - "HEAD~1"
   * - "main..dev"
   */
  refs?: readonly string[],
  /**
   * Optional file or directory paths to limit the diff scope.
   */
  paths?: readonly string[],
  /**
   * Diff options and flags.
   */
  opts: DiffOptions = {},
): Promise<string> {
  return utils.runCmd("diff", [
    ...utils.buildArgs(opts),
    ...(refs ?? []),
    ...(paths ? ["--", ...paths] : []),
  ])
}

/**
 * Show changes in the working tree compared to the index.
 *
 * @example
 * ```ts
 * await git.diffWorkingTree()
 * await git.diffWorkingTree(["src"])
 * ```
 *
 * @see {@link diff}
 * @see {@link hasDiff}
 *
 * @since 0.2.0
 */
export function diffWorkingTree(
  this: Api,
  /**
   * Optional paths to limit the diff output.
   */
  paths?: readonly string[],
): Promise<string> {
  return this.diff(undefined, paths)
}

/**
 * Show changes staged in the index.
 *
 * @example
 * ```ts
 * await git.diffStaged()
 * await git.diffStaged(["src/index.ts"])
 * ```
 *
 * @see {@link diff}
 * @see {@link diffWorkingTree}
 *
 * @since 0.2.0
 */
export function diffStaged(
  this: Api,
  /**
   * Optional paths to limit the diff output.
   */
  paths?: readonly string[],
): Promise<string> {
  return this.diff(undefined, paths, {
    flags: ["--cached"],
  })
}

/**
 * Show changes between `HEAD` and the working tree.
 *
 * @example
 * ```ts
 * await git.diffHead()
 * await git.diffHead(["README.md"])
 * ```
 *
 * @see {@link diffCommits}
 *
 * @since 0.2.0
 */
export function diffHead(
  this: Api,
  /**
   * Optional paths to limit the diff output.
   */
  paths?: readonly string[],
): Promise<string> {
  return this.diff(["HEAD"], paths)
}

/**
 * Show changes between two commits.
 *
 * @example
 * ```ts
 * await git.diffCommits("HEAD~1", "HEAD")
 * await git.diffCommits("main", "dev", ["src"])
 * ```
 *
 * @see {@link diffRange}
 *
 * @since 0.2.0
 */
export function diffCommits(
  this: Api,
  /**
   * Base commit.
   */
  from: string,
  /**
   * Target commit.
   */
  to: string,
  /**
   * Optional paths to limit the diff output.
   */
  paths?: readonly string[],
): Promise<string> {
  return this.diff([from, to], paths)
}

/**
 * Show changes for a commit range.
 *
 * @example
 * ```ts
 * await git.diffRange("main...dev")
 * await git.diffRange("v1.0.0...v1.1.0", ["src"])
 * ```
 *
 * @see {@link diffCommits}
 *
 * @since 0.2.0
 */
export function diffRange(
  this: Api,
  /**
   * Commit range in `A...B` format.
   */
  range: `${string}...${string}`,
  /**
   * Optional paths to limit the diff output.
   */
  paths?: readonly string[],
): Promise<string> {
  return this.diff([range], paths)
}

/**
 * Compare two files directly, even if they are outside a Git repository.
 *
 * @example
 * ```ts
 * await git.diffFiles("a.txt", "b.txt")
 * ```
 *
 * @since 0.2.0
 */
export function diffFiles(
  this: Api,
  /**
   * First file path.
   */
  fileA: string,
  /**
   * Second file path.
   */
  fileB: string,
): Promise<string> {
  return this.diff([fileA, fileB], undefined, {
    flags: ["--no-index"],
  })
}

export interface DiffStats {
  files: number
  additions: number
  deletions: number
  binaryFiles: number
}

/**
 * Get diff statistics for the working tree.
 *
 * @returns Aggregated diff statistics
 *
 * @example
 * ```ts
 * const stats = await git.diffStats()
 * // { files: 3, additions: 24, deletions: 6, binaryFiles: 0 }
 * ```
 *
 * @see {@link diffStatsStaged}
 * @see {@link diffStatsCommits}
 * @see {@link parseNumStat}
 *
 * @since 0.2.0
 */
export async function diffStats(this: Api): Promise<DiffStats> {
  const res = await this.diff(undefined, undefined, {
    flags: ["--numstat"],
  })

  return parseNumStat(res)
}

/**
 * Get diff statistics for staged changes.
 *
 * @returns Aggregated diff statistics
 *
 * @example
 * ```ts
 * const stats = await git.diffStatsStaged()
 * ```
 *
 * @see {@link diffStats}
 *
 * @since 0.2.0
 */
export async function diffStatsStaged(this: Api): Promise<DiffStats> {
  const res = await this.diff(undefined, undefined, {
    flags: ["--cached", "--numstat"],
  })

  return parseNumStat(res)
}

/**
 * Get diff statistics between two commits.
 *
 * @returns Aggregated diff statistics
 *
 * @example
 * ```ts
 * const stats = await git.diffStatsCommits("HEAD~1", "HEAD")
 * ```
 *
 * @see {@link diffStats}
 *
 * @since 0.2.0
 */
export async function diffStatsCommits(
  this: Api,
  /**
   * Base commit.
   */
  from: string,
  /**
   * Target commit.
   */
  to: string,
): Promise<DiffStats> {
  const res = await this.diff([from, to], undefined, {
    flags: ["--numstat"],
  })

  return parseNumStat(res)
}

/**
 * Check whether the working tree contains unstaged changes.
 *
 * @returns `true` if unstaged changes exist, otherwise `false`
 *
 * @example
 * ```ts
 * if (await git.hasDiff()) {
 *   console.log("Working tree has changes")
 * }
 * ```
 *
 * @see {@link diffWorkingTree}
 * @see {@link hasStagedDiff}
 *
 * @since 0.2.0
 */
export async function hasDiff(this: Api): Promise<boolean> {
  try {
    await this.diff(undefined, undefined, {
      flags: ["--quiet"],
    })
    return false
  } catch (err) {
    if (err instanceof Error && "exitCode" in err && err.exitCode === 1) {
      return true
    }

    throw err
  }
}

/**
 * Check whether the index contains staged changes.
 *
 * @returns `true` if staged changes exist, otherwise `false`
 *
 * @example
 * ```ts
 * if (await git.hasStagedDiff()) {
 *   console.log("There are staged changes")
 * }
 * ```
 *
 * @see {@link hasDiff}
 * @see {@link getStagedFiles}
 *
 * @since 0.2.0
 */
export async function hasStagedDiff(this: Api): Promise<boolean> {
  try {
    await this.diff(undefined, undefined, {
      flags: ["--cached", "--quiet"],
    })
    return false
  } catch (err) {
    if (err instanceof Error && "exitCode" in err && err.exitCode === 1) {
      return true
    }

    throw err
  }
}

/**
 * Get a list of files that are currently staged.
 *
 * @returns Array of staged file paths
 *
 * @example
 * ```ts
 * const files = await git.getStagedFiles()
 * // ["src/index.ts"]
 * ```
 *
 * @see {@link stagedFileCount}
 * @see {@link diffStaged}
 *
 * @since 0.2.0
 */
export async function getStagedFiles(this: Api): Promise<string[]> {
  const res = await this.diff(undefined, undefined, {
    flags: ["--cached", "--name-only"],
  })

  return res
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
}

/**
 * Get a list of files changed in the working tree.
 *
 * @returns Array of changed file paths
 *
 * @example
 * ```ts
 * const files = await git.getChangedFiles()
 * // ["src/index.ts", "README.md"]
 * ```
 *
 * @see {@link diffWorkingTree}
 * @see {@link changedFileCount}
 * @see {@link getStagedFiles}
 *
 * @since 0.2.0
 */
export async function getChangedFiles(this: Api): Promise<string[]> {
  const res = await this.diff(undefined, undefined, {
    flags: ["--name-only"],
  })

  return res
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
}

/**
 * Get the number of files changed in the working tree.
 *
 * @returns Number of changed files
 *
 * @example
 * ```ts
 * const count = await git.changedFileCount()
 * console.log(count)
 * ```
 *
 * @see {@link getChangedFiles}
 *
 * @since 0.2.0
 */
export async function changedFileCount(this: Api): Promise<number> {
  const res = await this.getChangedFiles()
  return res.length
}

/**
 * Get the number of staged files.
 *
 * @returns Total count of staged files
 *
 * @example
 * ```ts
 * const count = await git.stagedFileCount()
 * ```
 *
 * @see {@link getStagedFiles}
 *
 * @since 0.2.0
 */
export async function stagedFileCount(this: Api): Promise<number> {
  const files = await this.getStagedFiles()

  return files.length
}

/**
 * Get a short diff summary.
 *
 * @returns Short stat summary string
 *
 * @example
 * ```ts
 * const summary = await git.diffStatSummary()
 * // "3 files changed, 24 insertions(+), 6 deletions(-)"
 * ```
 *
 * @since 0.2.0
 */
export async function diffStatSummary(this: Api): Promise<string> {
  return this.diff(undefined, undefined, {
    flags: ["--shortstat"],
  })
}

/**
 * Get a short diff summary for staged changes.
 *
 * @returns Short stat summary string
 *
 * @example
 * ```ts
 * const summary = await git.diffStatStagedSummary()
 * ```
 *
 * @since 0.2.0
 */
export async function diffStatStagedSummary(this: Api): Promise<string> {
  return this.diff(undefined, undefined, {
    flags: ["--shortstat", "--cached"],
  })
}

/**
 * Check whether all working tree changes are whitespace-only.
 *
 * @returns `true` if all changes are whitespace-only
 *
 * @example
 * ```ts
 * if (await git.hasOnlyWhitespaceChanges()) {
 *   console.log("Only formatting changes detected")
 * }
 * ```
 *
 * @see {@link hasOnlyEOLChanges}
 *
 * @since 0.2.0
 */
export async function hasOnlyWhitespaceChanges(this: Api): Promise<boolean> {
  const hasChanges = await this.hasDiff()
  if (!hasChanges) return false

  try {
    await this.diff(undefined, undefined, {
      flags: ["--ignore-all-space", "--quiet"],
    })

    return true
  } catch (err) {
    if (err instanceof Error && "exitCode" in err && err.exitCode === 1) {
      return false
    }

    throw err
  }
}

/**
 * Check whether all changes are end-of-line only (CRLF ↔ LF).
 *
 * @returns `true` if all changes are EOL-only
 *
 * @example
 * ```ts
 * if (await git.hasOnlyEOLChanges()) {
 *   console.log("Only EOL changes detected")
 * }
 * ```
 *
 * @since 0.2.0
 */
export async function hasOnlyEOLChanges(this: Api): Promise<boolean> {
  const hasChanges = await this.hasDiff()
  if (!hasChanges) return false

  try {
    await this.diff(undefined, undefined, {
      flags: ["--ignore-cr-at-eol", "--quiet"],
    })

    return true
  } catch (err) {
    if (err instanceof Error && "exitCode" in err && err.exitCode === 1) {
      return false
    }

    throw err
  }
}

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
