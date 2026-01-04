/**
 * Options for {@link status}.
 */
export interface StatusOptions {
  /**
   * Flags passed directly to `git status`.
   */
  flags?: (
    | "--short"
    | "--branch"
    | "--show-stash"
    | "--porcelain"
    | "--porcelain=v2"
    | "--long"
    | "--verbose"
    | "--ignored"
    | "--untracked-files=no"
    | "--untracked-files=normal"
    | "--untracked-files=all"
    | "--ignore-submodules=none"
    | "--ignore-submodules=untracked"
    | "--ignore-submodules=dirty"
    | "--ignore-submodules=all"
    | "--ahead-behind"
    | "--no-ahead-behind"
  )[]
}
