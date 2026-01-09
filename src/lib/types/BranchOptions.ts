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
    | "--set-upstream"
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
}
