export interface InitOptions {
  flags?: ("--quiet" | "--bare")[]

  /**
   * Use branch-name for the initial branch in the newly created repository.
   *
   * @default "main"
   */
  "--initial-branch"?: "main" | "master"

  /**
   * Specify the directory from which templates will be used.
   */
  "--template"?: string

  /**
   * Hash algorithm.
   *
   * @default "sha1"
   */
  "--object-format"?: "sha1" | "sha256"

  /**
   * @default ".git"
   */
  "--separate-git-dir"?: string
}
