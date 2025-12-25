type InitFlags =
  /**
   * Only print error and warning messages.
   * All other output will be suppressed.
   */
  | "-q"

  /**
   * Create a bare repository.
   * If GIT_DIR environment is not set, it is set to the current working directory.
   */
  | "--bare";

interface InitInputs {
  /**
   * Use branch-name for the initial branch in the newly created repository.
   *
   * @default "main" for Git 3.0
   */
  "--initial-branch"?: "main" | "master";

  /**
   * Specify the directory from which templates will be used.
   *
   * {@link https://git-scm.com/docs/git-init#_template_directory}
   */
  "--template"?: string;

  /**
   * Hash algorithm.
   *
   * @default "sha1"
   */
  "--object-format"?: "sha1" | "sha256";

  /**
   * @default ".git"
   */
  "--separate-git-dir"?: string;

  /**
   * Specify the given ref storage <format> for the repository.
   *
   * @default "files"
   */
  "--ref-format"?: /**
   *  For loose files with packed-refs
   */
  | "files"

    /**
     * For the reftable format.
     * This format is experimental and its internals are subject to change
     */
    | "reftable";

  /**
   * Shared repository mode.
   */
  "--shared"?:
    | boolean
    | "umask"
    | "group"
    | "all"
    | "world"
    | "everybody"
    | number;
}

export type InitOptions = { flags?: InitFlags[] } & InitInputs;
