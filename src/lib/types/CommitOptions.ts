export interface CommitOptions {
  flags?: (
    | "--amend"
    | "--no-verify"
    | "--signoff"
    | "--no-edit"
    | "--all"
    | "--patch"
    | "--allow-empty"
    | "--allow-empty-message"
    | "--quiet"
    | "--status"
    | "--no-status"
    | "--reset-author"
  )[]

  /**
   * Override the commit author.
   *
   * Format: "name <email>"
   */
  "--author"?: string

  /**
   * Override the author date used in the commit.
   *
   * @example
   * - "2024-01-01"
   * - "yesterday"
   * - "RFC 2822 / ISO 8601"
   */
  "--date"?: string

  "--cleanup"?: "strip" | "whitespace" | "verbatim" | "scissors" | "default"

  /**
   *
   * @default "all"
   */
  "--untracked-files"?: "no" | "normal" | "all"

  /**
   * Use a commit message template file.
   */
  "--template"?: string

  /**
   * Take commit message from file or stdin ("-").
   */
  "--file"?: string

  /**
   * GPG-sign the commit.
   *
   * @example
   * - true  → --gpg-sign
   * - string → --gpg-sign=<keyid>
   */
  "--gpg-sign"?: true | string

  "--squash"?: string

  "--reuse-message"?: string

  "--fixup"?: string
}
