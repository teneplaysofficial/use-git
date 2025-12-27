import type Base from "../utils/base"
import {
  COMMIT_FLAGS,
  type CommitFlagKeys,
  type CommitFlagValues,
} from "./commit.types"

export class Commit {
  private ctx = new Set<CommitFlagValues>()
  private user: {
    name: string
    email?: string
  } | null = null

  constructor(private git: Base) {}

  private flag(key: CommitFlagKeys): this {
    this.ctx.add(COMMIT_FLAGS[key])
    return this
  }

  /** Skip the pre-commit and commit-msg hooks */
  get noVerify(): this {
    return this.flag("noVerify")
  }

  /** Do not create a commit, but show a list of paths that are to be committed */
  get dryRun(): this {
    return this.flag("dryRun")
  }

  /** Amend the previous commit */
  get amend(): this {
    return this.flag("amend")
  }

  /** Add a Signed-off-by trailer */
  get signOff(): this {
    return this.flag("signOff")
  }

  /** Reuse the existing commit message and skip editor */
  get noEdit(): this {
    return this.flag("noEdit")
  }

  /** Allow creating an empty commit */
  get allowEmpty(): this {
    return this.flag("allowEmpty")
  }

  /** Allow commits with an empty commit message */
  get allowEmptyMessage(): this {
    return this.flag("allowEmptyMessage")
  }

  /**
   * @ignore
   */
  private async create({
    message,
    description,
  }: {
    message: string
    description?: string
  }): Promise<string> {
    if (message) this.ctx.delete(COMMIT_FLAGS.noEdit)

    return this.git.runCmd(
      "commit",
      [
        ...this.ctx,
        this.user?.name && `--author`,
        this.user?.name,
        this.user?.email && `<${this.user.email.replace(/^<|>$/g, "")}>`,
        ...(message ? ["-m", this.git.quoteArg(message)] : []),
        ...(description ? ["-m", this.git.quoteArg(description)] : []),
      ].filter(Boolean),
    )
  }

  /**
   * Commit with a new message.
   *
   * @override The previously set `--no-edit` flag.
   */
  async message(
    /** Commit summary line */
    message: string,
    /** Optional commit body */
    description?: string,
  ): Promise<this> {
    await this.create({ message, description })
    return this
  }

  /**
   * Execute the commit using the currently configured flags.
   *
   * @description
   * - Does not provide a commit message and does not open an editor.
   * - Intended for workflows using flags like `--no-edit`, `--amend` or other preconfigured commit options.
   *
   * @example
   * ```ts
   * await git.commit.noEdit.amend.run()
   * await git.commit.signOff.verbose.run()
   * ```
   */
  async run() {
    await this.git.runCmd("commit", [...this.ctx])

    return this
  }

  /**
   * Set a temporary author for this commit.
   */
  author(
    /** Author name */
    name: string,
    /** Optional author email */
    email?: string,
  ) {
    this.user = { name, email }

    return this
  }
}
