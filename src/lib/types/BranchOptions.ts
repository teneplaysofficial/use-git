export interface BranchOptions {
  /**
   * Branch operation flags.
   *
   * @description
   * Some flags require branch names:
   *  - `--delete`, `-D`
   *  - `--move`, `-M`
   *  - `--copy`, `-C`
   */
  flags?: (
    | "--all"
    | "--show-current"
    | "--list"
    | "--remotes"
    | "--force"
    | "--delete"
    | "-D"
    | "--move"
    | "-M"
    | "--copy"
    | "-C"
    | "--ignore-case"
    | "--omit-empty"
    | "--no-column"
    | "--quiet"
    | "--no-abbrev"
    | "--unset-upstream"
  )[]

  /**
   * Color branches to highlight current, local, and remote-tracking branches.
   *
   * @default "always"
   */
  "--color"?: "always" | "auto" | "never"

  /**
   * Display branch listing in columns.
   */
  "--column"?: string

  /**
   * Sort branch output by the specified key.
   */
  "--sort"?: string

  /**
   * Minimum abbreviation length for object names.
   */
  "--abbrev"?: string

  /**
   * Set upstream branch.
   *
   * @description
   * Sets the upstream branch explicitly, typically in the form: `remote/branch`.
   *
   * @example
   * "origin/main"
   */
  "--set-upstream-to"?: string
}
