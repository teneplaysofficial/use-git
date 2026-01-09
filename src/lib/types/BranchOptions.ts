export interface BranchOptions {
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

  "--sort"?: string

  "--abbrev"?: string
}
